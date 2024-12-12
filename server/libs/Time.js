class Time {
    #date = new Date();
    constructor() {
        this.year = this.#date.getFullYear();
        this.month = this.#date.getMonth() + 1;
        this.day = this.#date.getDate();
        this.hour = this.#date.getHours();
        this.minute = this.#date.getMinutes();
        this.second = this.#date.getSeconds();
        this.milliseconds = this.#date.getMilliseconds();
    }

    getDate() {
        return this.#date;
    }
}

module.exports = Time;