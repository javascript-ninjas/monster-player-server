import express from "express";
import Playlist from '../classes/models/playlist.es6';
import Session from '../classes/models/session.es6';

let router = express();

router.put('/:playlist_id/:media_id', (req, res) => {
    let playlistID = req.params.playlist_id;
    let mediaID = req.params.media_id;
    let playlist = new Playlist();

    playlist.addRelation(playlistID, mediaID, (response) => {
        res.json({
            status: 'success'
        });
    });
});

router.get('/', (req, res) => {
    let token = req.headers.token;
    let playlist = new Playlist();


    res.json({
        'status': 'success'
    });
});

router.post('/', (req, res) => {
    let name = req.body.name;
    let userID = req.body.user_id;
    let playlist = new Playlist();

    playlist.save({ name: name }, { _id: userID }, (response) => {
        if (response.success) {
            res.json({
                'status': 'success',
                'playlist': response.playlist
            });
        }
    });
});

router.all('/', (req, res) => {
    res.json({
        'status': 'success'
    });
});

export default router;