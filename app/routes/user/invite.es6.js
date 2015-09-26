import express from "express";

let router = express();

router.all('/', (req, res) => {
    res.json({});
});

export default router;