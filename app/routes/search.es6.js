import express from "express";
import ServiceFacade from "../classes/serviceFacade.es6";

let router = express();

router.get('/:query', (req, res) => {
    let serviceFacade = new ServiceFacade();
    serviceFacade.setQuery(req.params.query);

    serviceFacade.fetch((response) => {
        if (response.success) {
            res.json({
                status: "success",
                items: response.items
            });
        } else {
            res.status(404);
            res.json({
                status: 'error',
                errors: [
                    { msg: process.localeManager.get('SERVICE_NOT_AVAILABLE') }
                ]
            });
        }
    });
});

export default router;
