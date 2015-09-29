import express from "express";

let router = express();

router.all('/', (req, res) => {
    res.json({
        status: 'success'
    });
});

export default router;
