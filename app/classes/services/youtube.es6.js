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

    onDataFetch(error, response, body) {
        console.log(response);
    }

    getApiURL() {
        return this.url + 'part=' + this.query + '&key=' + this.key;
    }
}

export default Youtube;