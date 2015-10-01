import _ from "underscore";
import Model from "./model.es6";

class Media extends  Model {

    find(media, callback) {
        this.collection.find({ id: media.id }, (errors, response) => {
            if (response.length) {
                return callback({
                    success: true
                });
            }

            return this._errorHandler(callback);
        });
    }

    findByID(mediaID, callback) {
        this.collection.find({
            id: mediaID
        }, (errors, response) => {
            if (response.length) {
                return callback({
                    success: true,
                    playlist: _.first(response)
                });
            }

            return this._errorHandler(callback);
        });
    }

    save(media) {
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
