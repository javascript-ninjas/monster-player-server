import _ from "underscore";
import Promise from "promise";
import Youtube from "./services/youtube.es6";
import SoundCloud from "./services/soundCloud.es6";


class ServiceFacade {
    constructor() {
        this.youtube = new Youtube();
        this.soundCloud = new SoundCloud();
    }

    setQuery(query) {
        this.youtube.setQuery(query);
        this.soundCloud.setQuery(query);
    }

    fetch(callback) {
        let items = [];
        let promises = [
            new Promise((resolve, reject) => {
                this.youtube.fetch((response) => {
                    if (response.success) {
                        resolve(response.items);
                    } else {
                        resolve([]);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                this.soundCloud.fetch((response) => {
                    if (response.success) {
                        resolve(response.items);
                    } else {
                        resolve([]);
                    }
                });
            })
        ];

        Promise.all(promises).then((values) => {
            values.forEach((value) => {
                items = items.concat(value);
            });

            callback({
                'success': true,
                'items': items
            })
        });
    }
}

export default ServiceFacade;