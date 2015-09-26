import _ from "underscore";
import md5 from "md5";
import Model from "./model.es6";

class Media extends  Model {

    find(media, callback) {

    }

    save(media, callback) {
        this.collection = this._getCollection();

        this.collection.insert({
            title: media.title,
            url: media.url,
            description: media.description,
            thumb: media.thumb
        }).success(() => {
            callback({
                success: true,
                media: media
            });
        }).error(() => {
            callback({
                success: false
            });
        });

    }

    _getCollection() {
        return this.db.get('Media');
    }
}

export default Media;