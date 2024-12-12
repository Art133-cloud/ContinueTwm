const Time = require("./Time");

class Failure {
    constructor({ message = "", error = {}, time = false }) {
        this.status = "failure";
        this.message = message;
        this.error = {
            name: error.name,
            message: error.message,
            location: error.stack.split("\n")[1].trim()
        }
        if (time === true) {
            this.time = new Time();
        }
    }
}

module.exports = Failure;