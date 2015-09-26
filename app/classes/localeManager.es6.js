import PL from "../locale/pl_PL.es6"

class LocaleManager {
    constructor (countryCode) {
        this.country = countryCode;
    }

    load () {
        switch (this.country) {
            case 'pl_PL': this.dist = PL;
                break;

            default:
                this.dist = PL;
        }
    }

    get (id) {
        return this.dist[id];
    }
}

export default LocaleManager;
