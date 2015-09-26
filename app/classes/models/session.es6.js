import Model from "./model.es6";

class Session {
    _getCollection() {
        this.db.get('Sessions');
    }
}

export default Session;