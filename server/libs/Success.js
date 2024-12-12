const Time = require("./Time");

class Success {
    constructor({ message = "", data = {}, time = false }) {
        this.status = "success";
        this.message = message;
        this.data = data;
        if (time === true) this.time = new Time();
    }

    static message(message) {
        return message;
    };
}

module.exports = Success;