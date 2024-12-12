const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const InvalidData = require("../libs/InvalidData");
const Status = require("../libs/Status");
const Failure = require("../libs/Failure");
const User = require("../models/user-model");

const userService = {
    registration(req) {
        return new Promise(async (resovle, reject) => {
            try {
                const { name, email, password, confirmPassword } = req.body;
                const userData = { name, email, password, confirmPassword };
                const invalidData = new InvalidData(userData);
                if (!invalidData.isValid) {
                    return reject(new Status({
                        status: 400,
                        message: "Invalid data",
                        data: invalidData,
                        ok: false
                    }));
                }
                const user = await User.findOne({ where: { email } });
                if (user) {
                    return reject(new Status({
                        status: 409,
                        message: "User with that email already exists",
                        ok: false
                    }));
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.create({ name, email, password: hashedPassword });
                return resovle(new Status({
                    status: 201,
                    message: "Registered successfully"
                }));
            } catch (error) {
                console.error(new Failure({ error }));
                reject(new Status({
                    status: 500,
                    message: "Server error",
                    ok: false
                }));
            }
        });
    },

    login(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = req.body;
                const userData = { email, password };
                const invalidData = new InvalidData(userData);
                if (!invalidData.isValid) {
                    return reject(new Status({
                        status: 401,
                        message: "Invalid credentials",
                        data: invalidData,
                        ok: false
                    }));
                }
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    return reject(new Status({
                        status: 400,
                        message: "Incorrect email",
                        ok: false
                    }));
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return reject(new Status({
                        status: 401,
                        message: "Incorrect password",
                        ok: false
                    }));
                }
                const accessToken = jwt.sign(
                    { id: user.id },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: "1h" }
                );
                const refreshToken = jwt.sign(
                    { id: user.id },
                    process.env.JWT_REFRESH_SECRET,
                    { expiresIn: "7d" }
                );
                await User.update(
                    { refreshToken },
                    { where: { id: user.id } }
                );

                return resolve(new Status({
                    status: 200,
                    message: "Login successfully",
                    data: { accessToken, refreshToken },
                }));
            } catch (error) {
                console.error(new Failure({ error }));
                return reject(new Status({
                    status: 500,
                    message: "Server error",
                    ok: false
                }));
            }
        });
    },

    async updateTokens(req) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return new Status({
                    status: 400,
                    message: "Refresh token is required",
                    ok: false
                });
            }
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await userMethods.getUserById(decoded.id);
            if (!user || user.refreshToken !== refreshToken) {
                return new Status({
                    status: 403,
                    message: "Invalid refresh token",
                    ok: false
                });
            }
            const newAccessToken = jwt.sign(
                { id: user.id },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: "1h" }
            );
            const newRefreshToken = jwt.sign(
                { id: user.id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
            );
            await userMethods.updateRefreshToken(user.id, newRefreshToken);
            return new Status({
                status: 200,
                message: "Tokens refreshed successfully",
                data: { accessToken: newAccessToken, refreshToken: newRefreshToken }
            });
        } catch (error) {
            console.error(new Failure({ error }));
            return new Status({
                status: 500,
                message: "Server error",
                ok: false
            });
        }
    },

    getProfile(req) {
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(new Status({
                    status: 200,
                    message: "You have access to this profile",
                    data: {
                        user: await User.findOne({
                            where: { id: req.user.id }
                        })
                    },
                }));
            } catch (error) {
                console.error(new Failure({ error }));
                return reject(new Status({
                    status: 400,
                    message: "Access denied",
                    ok: false
                }));
            }
        });
    },

    updateProfile(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { token, data } = req.body;
                if (!token) {
                    return reject(new Status({
                        status: 401,
                        message: "Access token is required",
                        ok: false
                    }));
                }
                if (!data || Object.keys(data).length === 0) {
                    return reject(new Status({
                        status: 400,
                        message: "No data provided for update",
                        ok: false
                    }));
                }
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                const user = await User.findOne({ where: { id: decoded.id } });
                if (!user) {
                    return reject(new Status({
                        status: 404,
                        message: "User not found",
                        ok: false
                    }));
                }
                const { email, name, password } = data;
                const updates = {};
                if (email) updates.email = email;
                if (name) updates.name = name;
                if (password) updates.password = password;
                const invalidData = new InvalidData(updates);
                if (!invalidData.isValid) {
                    return reject(new Status({
                        status: 400,
                        message: "Invalid data",
                        data: invalidData,
                        ok: false
                    }));
                }
                updates.password = await bcrypt.hash(password, 10);
                await User.update(updates, { where: { id: user.id } });
                resolve(new Status({
                    status: 200,
                    message: "User profile was updated successfully",
                }));
            } catch (error) {
                console.error(new Failure({ error }));
                reject(new Status({
                    status: 500,
                    message: "Server error",
                    ok: false
                }));
            }
        });
    },

    deleteProfile(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { token } = req.body;
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                const user = await User.findOne({ where: { id: decoded.id } });
                if (!user) {
                    return reject(new Status({
                        status: 404,
                        message: "User not found",
                        ok: false
                    }));
                }
                await User.destroy({ where: { id: decoded.id } });
                return resolve(new Status({
                    status: 204,
                    message: "User profile was deleted successfully",
                }));
            } catch (error) {
                console.error(new Failure({ error }));
                reject(new Status({
                    status: 500,
                    message: "Server error"
                }));
            }
        });
    }
};

module.exports = userService;