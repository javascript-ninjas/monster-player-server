import Model from "./model.es6";
import _ from "underscore";

class User extends Model {
    save(user, callback) {
        this.collection = this._getCollection();

        this.collection.find({ email: user.email }, (error, oldUser) => {
            if (oldUser.length) {
                return callback({
                    success: false,
                    error: [{
                        msg: process.localeManager.get('SINGUP_ERROR_EMAIL_USED')
                    }]
                });
            }

            this.collection.insert({
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: 'http://placehold.it/32x32'
            }).success(() => {
                callback({
                    success: true
                });
            }).error(() => {
                callback({
                    success: false,
                    errors: [{
                        msg: process.localeManager.get('SINGUP_ERROR_NOT_DEFINED')
                    }]
                })
            });
        });
    }

    update(callback) {

    }

    find(user, callback) {
        this.collection = this._getCollection();
        this.collection.find({ email: user.email }, (error, user) => {
             if (user.length) {
                return callback({
                    success: true,
                    user: _.first(user)
                });
             } else {
                 return callback({
                     success: false
                 });
             }
        });
    }

    _getCollection() {
        return this.db.get('Users');
    }
}

export default User;