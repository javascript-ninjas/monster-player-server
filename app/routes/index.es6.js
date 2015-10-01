import express from "express";

let router = express();

router.all('/', (req, res) => {
    res.send('Monster Player!!!!!!!!!!!');
});

export default router;
