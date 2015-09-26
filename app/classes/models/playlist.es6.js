import _ from "underscore";
import md5 from "md5";
import Model from "./model.es6";
import Media from "./media.es6";

class Playlist extends  Model {

    find(playlist, user, callback) {
        this.collection = this._getCollection();

        this.collection.find({
            name: playlist.name,
            owner: user._id
        }, (errors, response) => {
            if (response.length) {
                callback({
                    success: true,
                    playlist: _.first(response)
                });
            } else {
                callback({
                    success: false
                });
            }
        });
    }

    findByID(playlistID, callback) {
        this.collection = this._getCollection();

        this.collection.find({
            _id: playlistID
        }, (errors, response) => {
            if (response.length) {
                callback({
                    success: true,
                    playlist: _.first(response)
                });
            } else {
                callback({
                    success: false
                });
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
                    callback({
                        success: true,
                        relation: relation
                    })
                });
            }
        });
    }

    save(playlist, user, callback) {
        this.collection = this._getCollection();

        this.find(playlist, user, (response) => {
            if (!response.success) {
                this.collection.insert({
                    name: playlist.name,
                    owner: user._id
                }).success((newPlaylist) => {
                    callback({
                        success: true,
                        playlist: newPlaylist
                    });
                }).error(() => {
                    callback({
                        success: false
                    });
                });
            } else {
                callback({
                    status: false
                })
            }
        });
    }

    _getCollection() {
        return this.db.get('Playlists');
    }
}

export default Playlist;