import request from "request";

class Service {
    constructor() {}

    fetch() {
        request(this.getApiURL(), (error, response, body) => {
            console.log(error, response, body);
            this.onDataFetch(error,response, body);
        });
    }

    onDataFetch() {
        throw new Error('Service#onDataFetch: Every child class should overwrite `onDataFetch` method');
    }

    parse() {
        throw new Error('Service#parse: Every child class should overwrite `parse` method');
    }
}

export default Service;