import _ from "underscore";
import Service from "./service.es6";
import SoundCloudConfig from "../../../config/soundcloud.json";
import Media from "../models/media.es6";

class SoundCloud extends Service {
    constructor() {
        super();
        this.url = SoundCloudConfig.api_url;
        this.key = SoundCloudConfig.client_id;
    }

    setQuery(query) {
        this.query = query;
    }

    onDataFetch(error, response) {
        this.parse(JSON.parse(response.body));
    }

    getApiURL() {
        return this.url + '?q=' + encodeURIComponent(this.query) + '&key=' + this.key;
    }

    parse(response) {
        if (response.error) {
            return this.callback({
                success: false
            });
        }

        let items = [];
        let media = new Media();

        response.forEach((item) => {
            let dto = {
                id: this.getUniqueID('[soundcloud]:', item.title),
                url: item.permalink_url,
                title: item.title,
                thumb: item.user.avatar_url,
                description: item.description,
                type: "soundcloud"
            };

            media.save(dto);
            items.push();
        });

        return this.callback({
            success: true,
            items: items
        });
    }
}

export default SoundCloud;