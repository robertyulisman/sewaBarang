const express = require('express');
const router = express.Router();
const Vendor = require('../../models/Vendor');

// Routes

// @Routes  GET All Driver /api/driver/all
// @Private True
router.get('/', (req, res) => {
    Vendor.find()
    .then((vendor) => {
        res.json(vendor);
    })
});

// @Route POST /api/driver/register
// @Private False
router.post('/add', async (req, res) => {
    const { nama, email, kabupaten, alamat, gambar, provinsi } = req.body;

    const newVendor = new Vendor({
        email,
        nama,
        kabupaten,
        alamat,
        gambar,
        provinsi,
    });

    newVendor
        .save()
        .then((vendor) => {
            res.status(200).json(vendor);
        })
        .catch((err) => console.log(err));
});

router.delete('/:_id', (req, res) => {
    Vendor.findByIdAndDelete(req.params._id)
        .then((vendor) => {
            res.json(vendor);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
