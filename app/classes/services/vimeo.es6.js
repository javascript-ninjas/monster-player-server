import _ from "underscore";
import Service from "./service.es6";
import VimeoConfig from "../../../config/Vimeo.json";

class Vimeo extends Service {
    constructor() {
        super();
        this.url = VimeoConfig.api_url;
        this.token = VimeoConfig.token;
    }

    setQuery(query) {
        this.query = query;
    }

    onDataFetch(error, response) {
        this.parse(JSON.parse(response.body));
    }

    getApiURL() {
        return this.url + 'query=' + encodeURIComponent(this.query) + '&key=' + this.key;
    }

    parse(response) {
        if (response.error) {
            return this.callback({
                success: false
            });
        }

        let items = [];

        response.items.forEach(function (item) {
            items.push({
                id: _.uniqueId(),
                url: "http://www.w3schools.com/tags/movie.mp4",
                title: item.snippet.title,
                thumb: item.snippet.thumbnails.default.url
            })
        });

        return this.callback({
            success: true,
            items: items
        });
    }
}

export default Vimeo;