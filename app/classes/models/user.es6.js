import Model from "./model.es6";

class User extends Model {
    getUserByID(id, callback) {
        this.collection = this._getCollection();
    }

    save(user, callback) {
        this.collection = this._getCollection();

        this.collection.find({ email: user.email }, (error, oldUser) => {
            if (oldUser.length) {
                return callback({
                    success: false,
                    error: {
                        msg: process.localeManager.get('SINGUP_ERROR_EMAIL_USED')
                    }
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
                    error: {
                        msg: process.localeManager.get('SINGUP_ERROR_NOT_DEFINED')
                    }
                })
            });
        });
    }

    update(callback) {

    }

    find(callback) {

    }

    _getCollection() {
        return this.db.get('Users');
    }
}

export default User;