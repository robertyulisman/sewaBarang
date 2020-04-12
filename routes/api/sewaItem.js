const express = require('express');
const router = express.Router();

// const ArtistData = require('../../models/Artist');
const User = require('../../models/User');
const Product = require('../../models/Product');
const SewaItem = require('../../models/SewaItem');

router.get('/', (req, res) => {
    SewaItem.find()
        // .populate({
        //     path: 'product',
        //     model: 'Product',
        // })
        .then((vendor) => {
            res.json(vendor);
        });
});

router.post(
    '/assign/product/:user_id/:product_id',

    async (req, res) => {
        const newProduct = {
            product: req.params.product_id,
            jumlah: req.body.jumlah,
        };
        try {
            const user = await User.findById(req.params.user_id);
            const dataProduct = await Product.findById(req.params.product_id);

            // res.send(dataProduct);
            const newSewaItem = new SewaItem(newProduct);

            user.sewaItem.unshift(dataProduct);
            await newSewaItem.save();
            await user.save();
            res.send(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
);

router.delete(
    '/delete/product/:user_id/:product_id',

    async (req, res) => {
        const newProduct = {
            product: req.params.product_id,
            jumlah: req.body.jumlah,
        };
        try {
            const user = await User.findById(req.params.user_id);
            const dataProduct = await User.findByIdAndDelete(
                req.params.product_id,
            );

            // res.send(dataProduct);
            const newSewaItem = new SewaItem(newProduct);

            user.sewaItem.shift(dataProduct);
            await newSewaItem.save();
            await user.save();
            res.send(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
);

module.exports = router;
