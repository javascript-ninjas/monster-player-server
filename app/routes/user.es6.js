import express from "express";
import User from '../classes/models/user.es6';

let router = express();

// Try to sing-in User
router.post('/sign-in', (req, res) => {
    let user = new User();

    user.login(req.body, (DBresponse) => {
        if (DBresponse.success) {
            res.json({
                'status': "success",
                'login': true,
                'user': DBresponse.user
            });
        } else {
            res.json({
                'status': "error",
                'login': false,
                'errors': [
                    { msg: process.localeManager.get("SINGIN_FAIL") }
                ]
            });
        }
    });
});

// Try to sing-up User
router.post('/sign-up', (req, res) => {
    let user = new User();

    user.save(req.body, (DBresponse) => {
        if (DBresponse.success) {
            res.json({
                'status': "success",
                'login': false,
                'user': DBresponse.user
            });
            res.status(200);
        } else {
            res.json({
                'status': "error",
                'login': false,
                'errors': DBresponse.errors
            });
            res.status(200);
        }
    });
});

// Logout user
router.post('/logout', (req, res) => {
    res.json({
        'status': "success",
        'login': false
    });
    res.status(200);
});

// Get information about specific user
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = new User();

    console.log('dsadsadsada');

    user.findByID({ _id: id }, (DBresponse) => {
        if (DBresponse.success) {
            res.json({
                'status': "success",
                'user': DBresponse.user
            });
        } else {
            res.status(404);
            res.json({
                'status': "error",
                'errors': [{
                    msg: process.localeManager.get('USER_NOT_FOUND')
                }]
            });
        }
    });
});

// Get Information about User
router.get('/', (req, res) => {
    let userObj = {
        email: req.headers.email,
        password: req.headers.password,
        token: req.headers.token
    };
    let user = new User();

    user.findByEmail(userObj, (DBresponse) => {
        if (DBresponse.success) {
            res.json({
                'status': 'success',
                'user': DBresponse.user
            });
        } else {
            res.status(404);
            res.json({
                'status': 'error'
            });
        }
    });
});

// Delete user Account
router.delete('/', (res, req) => {
    res.json({
        'status': "success",
        'login': false
    });
    res.status(200);
});

// Password Change
router.post('/password-change', (res, req) => {
    res.json({
        'status': "success",
        'login': false
    });
    res.status(200);
});

export default router;