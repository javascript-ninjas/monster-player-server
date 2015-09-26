import _ from "underscore";
import md5 from "md5";
import Model from "./model.es6";

class Session extends  Model {

    find(user, callback) {

    }

    create(user, callback) {
        this.collection = this._getCollection();
        let token = _.uniqueId(user._id + '_');
        user.token = md5(token);

        this.collection.insert({
            userID: user._id,
            token: user.token,
            time: (new Date()).getTime()
        }).success(() => {
            callback({
                success: true,
                user: user
            });
        }).error(() => {
            callback({
                success: false
            });
        });
    }

    getUserIDFromToken(token, callback) {
        this.collection = this._getCollection();

        this.collection.find({ token: token }, (errors, results) => {
            if (results.length) {
                callback({
                    success: true,
                    userID: _.first(results).userID
                });
            }
        });
    }

    _getCollection() {
        return this.db.get('Sessions');
    }
}

export default Session;