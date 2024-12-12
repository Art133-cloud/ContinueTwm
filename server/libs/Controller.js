class Controller {
    constructor({ request, response, service }) {
        this.request = request;
        this.response = response;
        this.service = service;
    }

    connect() {
        this.service(this.request)
            .then(success => this.response.status(success.status).json(success))
            .catch(failure => this.response.status(failure.status).json(failure));
    }
};

module.exports = Controller;