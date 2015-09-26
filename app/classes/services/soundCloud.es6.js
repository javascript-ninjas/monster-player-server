import _ from "underscore";
import Service from "./service.es6";
import SoundCloudConfig from "../../../config/soundcloud.json";

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

        response.forEach(function (item) {
            items.push({
                id: _.uniqueId('soundcloud_'),
                url: item.permalink_url,
                title: item.title,
                thumb: item.user.avatar_url,
                description: item.description,
                type: "soundcloud"
            })
        });

        return this.callback({
            success: true,
            items: items
        });
    }
}

export default SoundCloud;