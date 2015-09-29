import _ from "underscore";
import Model from "./model.es6";
import Media from "./media.es6";

class Playlist extends  Model {

    find(playlist, user, callback) {
        this.collection.find({
            name: playlist.name,
            owner: user._id
        }, (errors, response) => {
            if (response.length) {
                return callback({
                    success: true,
                    playlist: _.first(response)
                });
            } else {
                return this._errorHandler(callback);
            }
        });
    }

    findByID(playlistID, callback) {
        this.collection.find({
            _id: playlistID
        }, (errors, response) => {
            if (response.length) {
                return callback({
                    success: true,
                    playlist: _.first(response)
                });
            } else {
                return this._errorHandler(callback);
            }
        });
    }

    addRelation(playlistID, mediaID, callback) {
        let collection = this.db.get('PlaylistMedia');
        let dto = {
            playlistID: playlistID,
            mediaID: mediaID
        };

        collection.find(dto, (errors, results) => {
            if (!results.length) {
                collection.insert(dto).success((relation) => {
                    return callback({
                        success: true,
                        relation: relation
                    });
                });
            }
        });
    }

    save(playlist, user, callback) {
        this.find(playlist, user, (response) => {
            if (!response.success) {
                this.collection.insert({
                    name: playlist.name,
                    owner: user._id
                }).success((newPlaylist) => {
                    return callback({
                        success: true,
                        playlist: newPlaylist
                    });
                }).error(() => {
                    return this._errorHandler(callback);
                });
            } else {
                return this._errorHandler(callback);
            }
        });
    }

    _getCollection() {
        return this.db.get('Playlists');
    }
}

export default Playlist;
