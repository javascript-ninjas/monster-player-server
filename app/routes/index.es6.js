import express from "express";

let router = express();

router.all('/', (req, res) => {
    res.send('HelloWorld');
});

export default router;