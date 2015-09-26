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
        return this.url + 'part=' + this.query + '&key=' + this.key;
    }

    parse(response) {
        if (response.error) {
            return this.callback({
                success: false
            });
        }

        return this.callback({
            success: true
        });
    }
}

export default Youtube;