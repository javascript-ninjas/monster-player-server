import _ from "underscore";
import Service from "./service.es6";
import YoutubeConfig from "../../../config/youtube.json";

class Youtube extends Service {
    constructor() {
        super();
        this.url = YoutubeConfig.api_url;
        this.key = YoutubeConfig.key;
    }

    setQuery(query) {
        this.query = query;
    }

    onDataFetch(error, response) {
        this.parse(JSON.parse(response.body));
    }

    getApiURL() {
        return this.url + '?order=viewCount&part=snippet&maxResults=25' + '&key=' + this.key;
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

export default Youtube;