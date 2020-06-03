const express = require('express');
const router = express.Router();

// const ArtistData = require('../../models/Artist');
const User = require('../../models/User');
const Product = require('../../models/Product');
const SewaItem = require('../../models/SewaItem');

router.get('/', (req, res) => {
    SewaItem.find()

        .populate({
            path: 'product',
            model: 'Product',
        })
        .then((vendor) => {
            res.json(vendor);
        });
});

router.post(
    '/assign/product/:user_id/:product_id',

    async (req, res) => {
        const user = await User.findById(req.params._id);
        const product = await Product.findById(req.params.product_id);
        const newItem = {
            user,
            product,
            tanggalAwal: req.body.tanggalAwal,
            tanggalAkhir: req.body.tanggalAkhir,
            jumlahHari: req.body.jumlahHari,
            total: req.body.total,
            statusPemesanan: req.body.statusPemesanan,
        };
        try {
            const user = await User.findById(req.params.user_id);
            const newSewaItem = new SewaItem(newItem);

            user.sewaItem.unshift(newSewaItem);
            await newSewaItem.save();
            await user.save();
            res.send(user);
        } catch (error) {
            //console.log(error);
            return res.status(500).json(error);
        }
    },
);

router.delete('/:sewa_id', (req, res) => {
    SewaItem.findByIdAndDelete(req.params.sewa_id)
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(error));
});

router.put('/update/:sewa_id', (req, res) => {
    const { statusPemesanan } = req.body;
    SewaItem.findById(req.params.sewa_id).then((data) => {
        if (statusPemesanan) {
            data.statusPemesanan = statusPemesanan;
        }

        data.save()
            .then((data) => {
                res.json({ msg: 'success', res: data });
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
});

module.exports = router;
