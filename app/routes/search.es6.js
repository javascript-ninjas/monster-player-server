import express from "express";

let router = express();
let items = [
    {
        "_id": "56069752d1f00f08004c5ce0",
        "url": "http://www.w3schools.com/tags/movie.mp4",
        "thumb": "http://placehold.it/32x32",
        "title": "irure mollit dolore"
    },
    {
        "_id": "5606975288ab5598c55a9536",
        "url": "http://www.w3schools.com/tags/movie.mp4",
        "thumb": "http://placehold.it/32x32",
        "title": "dolor qui ipsum"
    },
    {
        "_id": "560697523914f99c3d0329e1",
        "url": "http://www.w3schools.com/tags/movie.mp4",
        "thumb": "http://placehold.it/32x32",
        "title": "laborum ea nisi"
    },
    {
        "_id": "56069752c61ddf3bde8dd155",
        "url": "http://www.w3schools.com/tags/movie.mp4",
        "thumb": "http://placehold.it/32x32",
        "title": "commodo qui ex"
    },
    {
        "_id": "56069752f137aac3eedd1c85",
        "url": "http://www.w3schools.com/tags/movie.mp4",
        "thumb": "http://placehold.it/32x32",
        "title": "quis do consequat"
    }
];

router.get('/:query', (req, res) => {
    res.json({
        status: "success",
        items: items
    });
});

export default router;
