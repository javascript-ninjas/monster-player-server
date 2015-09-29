import express from "express";
import User from '../classes/models/user.es6';

let router = express();

// Try to sing-in User
router.post('/sign-in', (req, res) => {
    let user = new User();

    user.login(req.body, (response) => {
        if (response.success) {
            res.json({
                'status': "success",
                'login': true,
                'user': response.user
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

    user.save(req.body, (response) => {
        if (response.success) {
            res.json({
                'status': "success",
                'login': false,
                'user': response.user
            });
            res.status(200);
        } else {
            res.json({
                'status': "error",
                'login': false,
                'errors': response.errors
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

    user.find({ _id: id }, (response) => {
        if (response.success) {
            res.json({
                'status': "success",
                'user': response.user
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

    user.find(userObj, (response) => {
        if (response.success) {
            res.json({
                'status': 'success',
                'user': response.user
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
router.delete('/', (req, res) => {
    res.json({
        'status': "success",
        'login': false
    });
    res.status(200);
});

// Password Change
router.post('/password-change', (req, res) => {
    res.json({
        'status': "success",
        'login': false
    });
    res.status(200);
});

export default router;
