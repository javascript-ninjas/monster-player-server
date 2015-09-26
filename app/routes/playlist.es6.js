import express from "express";

let router = express();

router.all('/', (req, res) => {
    res.json({});
    res.send(200);
});

export default router;