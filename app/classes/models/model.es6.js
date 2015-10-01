import _ from 'underscore';

class Model {
    constructor() {
        this.db = process.db;
        this.collection = this._getCollection();
    }

    /**
     * @protected
     */
    _getCollection() {
        throw new Error("Model#_getCollection: Every `Model` child class should overwrite `_getCollection` method.");
    }

    /**
     * [_errorHandler description]
     * @param  {Function} callback [description]
     * @param  {Array}   errors   [description]
     * @return {Function}            [description]
     */
    _errorHandler(callback, errors) {
        let dto = {
            success: false
        };

        if (_.size(errors.length)) {
            dto.errors = errors;
        }

        return callback(dto);
    }
}

export default Model;
