import _ from "underscore";
import Model from "./model.es6";
import Session from "./session.es6";

class User extends Model {

    /**
     * Metoda obsługująca tylko i wyłącznie zapis nowego użytkownika do bazy danych
     *
     * @param user
     * @param callback
     * @private
     */
    _save(user, callback) {
        this.collection.insert({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: 'http://placehold.it/32x32'
        }).success((savedUser) => {
            console.log();
            callback({
                success: true,
                user: savedUser
            });
        }).error(() => {
            callback({
                success: false,
                errors: [{
                    msg: process.localeManager.get('SINGUP_ERROR_NOT_DEFINED')
                }]
            })
        });
    }

    /**
     * Metoda próbująca zapisac użytkownika do bazy danych. Najpierw sprawdza czy użytkownik istnieje już w bazie danych.
     *
     * @param user
     * @param callback
     */
    save(user, callback) {
        this.findByEmail(user, (DBresponse) => {
            if (DBresponse.success) {
                return callback({
                    success: false,
                    errors: [{
                        msg: process.localeManager.get('SINGUP_ERROR_EMAIL_USED')
                    }]
                });
            } else {
                this._save(user, callback);
            }
        });
    }

    login(user, callback) {
        this.findByEmail(user, (DBresponse) => {
            if (DBresponse.success) {
                if (DBresponse.user.password === user.password) {
                    let session = new Session();
                    session.create(DBresponse.user, (ses) => {
                        callback({
                            success: true,
                            login: true,
                            user: ses.user
                        });
                    });
                }
            } else {
                callback({
                    success: false,
                    login: false
                });
            }
        });
    }

    update(callback) {

    }

    findByID(user, callback) {
        this.collection = this._getCollection();
        try {
            this.collection.find({_id: user._id}, (error, user) => {
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
        } catch (e) {
            return callback({
                success: false
            });
        }
    }

    findByEmail(user, callback) {
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