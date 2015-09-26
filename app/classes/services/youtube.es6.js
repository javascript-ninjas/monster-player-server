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
        return this.url + '?order=viewCount&part=snippet&maxResults=50' + '&q=' + encodeURIComponent(this.query) + '&key=' + this.key;
    }

    parse(response) {
        if (response.error) {
            return this.callback({
                success: false
            });
        }

        let items = [];

        response.items.forEach(function (item) {
            if (item.id.kind === "youtube#video") {
                items.push({
                    id: _.uniqueId('youtube_'),
                    url: "https://www.youtube.com/watch?v=" + item.id.videoId,
                    title: item.snippet.title,
                    thumb: item.snippet.thumbnails.default.url,
                    description: item.snippet.description,
                    type: "youtube"
                })
            }
        });

        return this.callback({
            success: true,
            items: items
        });
    }
}

export default Youtube;