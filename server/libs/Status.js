const httpStatusCodes = require("./http-status-codes");

class Status {
    constructor({
        status = null,
        ok = true,
        message = "",
        data = {}
    }) {
        this.ok = !!ok;
        this.status = Status.isStatusCode(httpStatusCodes, status)
            ? status : null;
        this.description = httpStatusCodes[status]
            ? httpStatusCodes[status] : "";
        this.message = message;
        this.data = data;
    }

    static isStatusCode(codes, statusCode) {
        return Object
            .keys(codes)
            .map(code => +code)
            .includes(statusCode);
    }

    static isMetod(method) {
        return ["get", "post", "delete", "patch"]
            .includes(method.toLowerCase());
    }
}

module.exports = Status;