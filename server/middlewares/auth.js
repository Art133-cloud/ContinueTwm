const jwt = require("jsonwebtoken");
const Status = require("../libs/Status");

const auth = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json(new Status({
                status: 401,
                message: "Access token is required",
                ok: false
            }));
        }
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json(new Status({
                    status: 403,
                    message: "Invalid or expired token",
                    ok: false
                }));
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json(new Status({
            status: 500,
            message: "Server error",
            ok: false
        }));
    }
};

module.exports = auth;