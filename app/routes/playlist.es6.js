import express from "express";
import Playlist from '../classes/models/playlist.es6';

let router = express();

router.post('/:name', (req, res) => {
    let name = req.params.name;
    let userID = req.body.user_id;
    let playlist = new Playlist();

    playlist.save({ name: name }, { _id: userID }, (response) => {
        if (response.success) {
            res.json({
                'status': 200,
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