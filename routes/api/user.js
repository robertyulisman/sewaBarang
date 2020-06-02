const express = require('express');
const router = express.Router();

// Require passport for middleware
const passport = require('passport');

// Require nodemailer for gmail service
const nodemailer = require('nodemailer');

// Require jsonwebtoken to make token for session
const jwt = require('jsonwebtoken');

// Require async module
const async = require('async');

// Require crypto module
const crypto = require('crypto');

// Import key variabel
const key = require('../../config/keys');

// Import constant types
const constants = require('../../services/constantTypes');

// Import transport-user schema
// const TransportUser = require("simpfleet_models/models/TransportUser");
// const LogisticsCompany = require("simpfleet_models/models/LogisticsCompany");

const User = require('../../models/User');

// Require for validation inputs
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validatePasswordChange = require('../../validation/passwordChange');

// Middleware
const middleware = passport.authenticate('jwt', { session: false });

// Routes

// @Routes  GET All Driver /api/driver/all
// @Private True
router.get('/all', (req, res) => {
    User.find()
        .populate({
            path: 'sewaItem',
            model: 'Product',
        }) /* 
		.select("id firstName lastName contactNumber") */
        .then((driver) => {
            res.json(driver);
        });
});

// @Route GET /api/driver/
// @Private True
router.get('/:_id', (req, res) => {
    User.findById(req.params._id)
        .populate({
            path: 'sewaItem',
            model: 'Product',
        })
        .then((data) => {
            res.json(data);
        });
});

// @Route POST /api/driver/login
// @Private False
router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    });

    if (!user) {
        errors.email = 'user tidak ditemukan';
        return res.status(404).json(errors);
    }

    const isValidPassword = user.validPassword(password);

    if (!isValidPassword) {
        errors.password = 'Password salah';
        return res.status(400).json(errors);
    }

    const payload = {
        _id: user._id,
        email: user.email,
        nama: user.nama,
        alamat: user.alamat,
        kabupaten: user.kabupaten,
        tgl_lahir: user.tgl_lahir,
        image: user.image,
    };

    jwt.sign(payload, key.SECRET, { expiresIn: '1d' }, (err, token) => {
        // let user = payload;
        // user.contactNumber = transportUser.contactNumber
        //     ? transportUser.contactNumber
        //     : '';
        // user.firstName = transportUser.firstName ? transportUser.firstName : '';
        // user.lastName = transportUser.lastName ? transportUser.lastName : '';

        return res.status(200).json({
            success: true,
            token: 'Bearer ' + token,
            user,
        });
    });
});

// @Route POST /api/driver/register
// @Private False
router.post('/register', async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { nama, password, email, kabupaten, alamat, tgl_lahir, image} = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
        errors.email = 'Email already exist';
        return res.status(400).json(errors);
    } else {
        const newUser = new User({
            email,
            nama,
            kabupaten,
            alamat,
            tgl_lahir,
            image,
        });

        newUser.password = newUser.generateHash(password);
        newUser
            .save()
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => console.log(err));
    }
});

// @Route POST /api/driver/forgot
// @Private False

router.post('/forgot', (req, res, next) => {
    async.waterfall(
        [
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                TransportUser.findOne({ email: req.body.email }, function (
                    err,
                    user,
                ) {
                    if (!user) {
                        res.status(400).json({
                            status: false,
                            message: 'User not found',
                        });
                    } else {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour

                        user.save(function (err) {
                            done(err, token, user);
                        });
                    }
                });
            },
            function (token, user, done) {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: key.SHIP_SUPPLIES_DIRECT_SALES_EMAIL,
                        pass: key.SHIP_SUPPLIES_DIRECT_SALES_EMAIL_PASSWORD,
                    },
                });
                const mailOptions = {
                    to: user.email,
                    from: key.SHIP_SUPPLIES_DIRECT_SALES_EMAIL,
                    subject: 'SimpFleet Transporter: Forgot Password',

                    text:
                        'Hi ' +
                        user.firstName +
                        ' ' +
                        user.lastName +
                        ', \n\n' +
                        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link to complete the process:\n\n' +
                        `https://www.simpfleet-transporter.com/driversapp/${token}` +
                        '\n\n' +
                        'If you did not request this, please ignore this email.\n',
                };

                transporter.sendMail(mailOptions, function (err, response) {
                    console.log(
                        'info',
                        'An e-mail has been sent to ' +
                            user.email +
                            ' with further instructions.',
                    );
                    res.status(200).json({ status: true });
                    done(err, 'done');
                });
            },
        ],
        function (err) {
            if (err) return next(err);
            console.error('msgErr: ', err);
        },
    );
});

// @Route GET /api/driver/reset/:token
// @Private False
router.get('/reset/:token', (req, res) => {
    TransportUser.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpiry: {
            $gt: Date.now(),
        },
    }).then((user) => {
        if (user === null) {
            res.status(400).json('Password reset link is invalid');
        } else {
            res.status(200).send({
                user: user,
                success: true,
                message: 'Password reset link valid.',
            });
        }
    });
});

// @Route POST /api/driver/reset/:token
// @Private False
router.post('/reset/:token', (req, res) => {
    async.waterfall(
        [
            function (done) {
                TransportUser.findOne(
                    {
                        resetPasswordToken: req.params.token,
                        resetPasswordExpiry: { $gt: Date.now() },
                    },
                    function (err, user) {
                        if (!user) {
                            return res
                                .status(400)
                                .json(
                                    'Password reset token is invalid or has expired.',
                                );
                        }

                        user.password = user.generateHash(req.body.password);
                        user.resetPasswordToken = '';
                        user.resetPasswordExpiry = '';
                        user.save(() => {
                            res.status(200).send({
                                message: 'Password has been updated',
                                success: true,
                                email: user.email,
                            });
                        });
                    },
                );
            },
            function (user, done) {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: key.SHIP_SUPPLIES_DIRECT_SALES_EMAIL,
                        pass: key.SHIP_SUPPLIES_DIRECT_SALES_EMAIL_PASSWORD,
                    },
                });
                var mailOptions = {
                    to: user.email,
                    from: key.SHIP_SUPPLIES_DIRECT_SALES_EMAIL_PASSWORD,
                    subject:
                        'SimpFleet Transporter: Your password has been changed successfully',
                    text:
                        'Hi ' +
                        user.firstName +
                        ' ' +
                        user.lastName +
                        +',\n\n' +
                        'This is a confirmation that the password for your account, ' +
                        user.email +
                        ' has been changed.\n',
                };
                transporter.sendMail(mailOptions, function (err) {
                    done(err);
                });
            },
        ],
        function (err) {
            res.status(500).json('msgErr: ', err);
        },
    );
});

// @Route POST /api/driver/update/password
// @Private True
router.put('/update/:user_id', (req, res) => {
    const { nama, email, alamat, tgl_lahir, image} = req.body;
    User.findById(req.params.user_id).then((user) => {
        if (nama) {
            user.nama = nama;
        }
        if (email) {
            user.email = email;
        }
        if (alamat) {
            user.alamat = alamat;
        }
        if (tgl_lahir) {
            user.tgl_lahir = tgl_lahir;
        }
        if (image) {
            user.image = image;
        }

        user.save()
            .then((data) => {
                res.json({ msg: 'success', res: data });
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
});

// @Route POST /api/driver/update/password
// @Private True
router.post('/update/password', middleware, (req, res) => {
    const { errors, isValid } = validatePasswordChange(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    TransportUser.findById({ _id: req.user.id }).then((user) => {
        if (user.validPassword(req.body.currentPassword)) {
            user.password = user.generateHash(req.body.password);
            user.save().then(() => {
                res.json({ msg: 'success' });
            });
        } else {
            errors.currentPassword = 'Current password is not correct';
            res.send(errors);
        }
    });
});

// @Route POST /api/driver/user
// @Private False
router.post('/user', middleware, async (req, res) => {
    const { email } = req.body;
    const transportUser = await TransportUser.findOne({ email }).select(
        '_id firstName lastName contactNumber',
    );
    if (transportUser) {
        return res.status(200).json(transportUser);
    }

    return res.status(404).json({
        message: 'No user found.',
    });
});

module.exports = router;
