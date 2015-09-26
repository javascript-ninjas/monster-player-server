class Model {
    constructor() {
        this.db = process.db;
    }

    /**
     * @protected
     */
    _getCollection() {
        throw new Error("Model#_getCollection: Every `Model` child class should overwrite `_getCollection` method.");
    }
}

export default Model;