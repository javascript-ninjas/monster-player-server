import Youtube from "./services/youtube.es6"

class ServiceFacade {
    constructor() {
        this.youtube = new Youtube();
    }

    setQuery(query) {
        this.youtube.setQuery(query);
    }

    fetch(callback) {
        this.youtube.fetch(() => {
            callback();
        });
    }
}

export default ServiceFacade;