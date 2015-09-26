import express from "express";

let router = express();

function *getUser() {
    yield {
        "_id": "5606638e9e28cb004420251d",
        "name": "Rita",
        "password": "",
        "email": "ritapotts@zaj.com",
        "avatar": "http://placehold.it/32x32"
    };

    yield {
        "_id": "560663e10befdfe2ef3d2c29",
        "name": "Nita",
        "password": "",
        "email": "nitapotts@zaj.com",
        "avatar": "http://placehold.it/32x32"
    };

    yield {
        "_id": "560663efd964944667479d67",
        "name": "Lynn",
        "password": "",
        "email": "lynnpotts@zaj.com",
        "avatar": "http://placehold.it/32x32"
    };

    yield {
        "_id": "560663f4a98847ac472b076e",
        "name": "Underwood",
        "password": "",
        "email": "underwoodpotts@zaj.com",
        "avatar": "http://placehold.it/32x32"
    };

    yield {
        "_id": "5606640261f0adde610a7cc7",
        "name": "Peck",
        "password": "",
        "email": "peckpotts@zaj.com",
        "avatar": "http://placehold.it/32x32"
    };

    return {
        "_id": "5606664da5a2caf85ccfc64b",
        "name": "Wilcox",
        "password": "",
        "email": "wilcoxpotts@zaj.com",
        "avatar": "http://placehold.it/32x32"
    };
}

let it = getUser();

router.get('/', (req, res) => {
    let user = it.next();

    if (user.done) {
        it = getUser();
    }

    res.json(user);
    res.status(200);
});

export default router;