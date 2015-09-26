import _ from "underscore";
import Model from "./model.es6";

class Session {

    find(user, callback) {

    }

    create(user, callback) {
        this.collection = this._getCollection();

        this.collection.insert({
            userID: user._id,
            tokken: _.uniqueId(user._id + '_')
        }).success(() => {
            callback({
                success: true
            });
        }).error(() => {
            callback({
                success: false
            });
        });
    }

    _getCollection() {
        return this.db.get('Sessions');
    }
}

export default Session;