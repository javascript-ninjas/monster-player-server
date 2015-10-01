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
            this._errorHandler(callback, [{
                msg: process.localeManager.get('SINGUP_ERROR_NOT_DEFINED')
            }]);
        });
    }

    /**
     * Metoda próbująca zapisac użytkownika do bazy danych. Najpierw sprawdza czy użytkownik istnieje już w bazie danych.
     *
     * @param user
     * @param callback
     */
    save(user, callback) {
        this.find(user, (response) => {
            // Znaleziono użytkownika, trzeba zgłosić błąd.
            if (response.success) {
                return this._errorHandler(callback, [{
                    msg: process.localeManager.get('SINGUP_ERROR_EMAIL_USED')
                }]);
            } else {
                this._save(user, callback);
            }
        });
    }

    /**
     * Metoda probująca stworzyć nową sesję dla użytkownika.
     * @param  {Object}   user     [description]
     * @param  {Function} callback [description]
     * @return {Function}            [description]
     */
    login(user, callback) {
        this.find(user, (response) => {
            if (response.success) {
                if (response.user.password === user.password) {
                    let session = new Session();
                    session.create(response.user, (ses) => {
                        return callback({
                            success: true,
                            login: true,
                            user: ses.user
                        });
                    });
                }
            } else {
                return callback({
                    success: false,
                    login: false
                });
            }
        });
    }

    /**
     * Metoda wyszukująca obiekt użytkownika w bazie danych.
     * @param  {[type]}   user     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    find(user, callback) {
        try {
            this.collection.find(user, (error, user) => {
                if (user.length) {
                    return callback({
                        success: true,
                        user: _.first(user)
                    });
                } else {
                    return this._errorHandler(callback);
                }
            });
        } catch (e) {
            return this._errorHandler(callback);
        }
    }

    /**
     * [_getCollection description]
     * 
     * @overwrite Model
     * @return {[type]} [description]
     */
    _getCollection() {
        return this.db.get('Users');
    }
}

export default User;
