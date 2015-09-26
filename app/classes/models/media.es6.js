import _ from "underscore";
import md5 from "md5";
import Model from "./model.es6";

class Media extends  Model {

    find(media, callback) {
        this.collection = this._getCollection();

        this.collection.find({ id: media.id }, (errors, response) => {
            if (response.length) {
                return callback({
                    success: true
                });
            }

            return callback({
                success: false
            });
        });
    }

    save(media) {
        this.collection = this._getCollection();

        this.find(media, (response) => {
            if (!response.success) {
                this.collection.insert({
                    id: media.id,
                    title: media.title,
                    url: media.url,
                    description: media.description,
                    thumb: media.thumb,
                    type: media.type
                });
            }
        });
    }

    _getCollection() {
        return this.db.get('Media');
    }
}

export default Media;