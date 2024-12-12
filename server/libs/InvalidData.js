class InvalidData {
    constructor({ name, email, password, confirmPassword }) {
        this.name = InvalidData.validateName(name);
        this.email = InvalidData.validateEmail(email);
        this.password = InvalidData.validatePassword(password);
        this.confirmPassword = InvalidData.validateConfirmPassword(confirmPassword, password);
    }

    static validateName(name) {
        if (name == undefined) return "";
        if (name.trim() === "") return "Name is required";
        return /^[a-zA-Z0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>/?-]{3,}$/.test(name)
            ? ""
            : "Name must be at least 4 characters long and can contain letters, numbers, and special characters";
    }

    static validateEmail(email) {
        if (email == undefined) return "";
        if (!email || email.trim() === "") return "Email is required";
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
            ? ""
            : "Email is not valid";
    }

    static validatePassword(password) {
        if (password == undefined) return "";
        if (!password || password.trim() === "") {
            return "Password is required";
        }
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password)
            ? ""
            : "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character";
    }

    static validateConfirmPassword(confirmPassword, password) {
        if (confirmPassword == undefined) return "";
        if (!confirmPassword || confirmPassword.trim() === "") {
            return "Confirm password is required";
        }
        return confirmPassword === password
            ? ""
            : "Password confirmation must match the password";
    }

    get isValid() {
        return !Object.values(this).some((error) => error !== "");
    }
}

module.exports = InvalidData;