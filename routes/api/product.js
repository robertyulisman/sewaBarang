const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

// Routes

// @Routes  GET All Driver /api/driver/all
// @Private True
router.get('/', (req, res) => {
    Product.find() /* 
		.select("id firstName lastName contactNumber") */
        .then((product) => {
            res.json(product);
        });
});

router.post('/', async (req, res) => {
    const { kategori, namaBarang, harga, gambarBarang, jml_barang, alamat, kabupaten, provinsi, deskripsi, jaminan} = req.body;
    const newProduct = new Product({
        kategori,
        namaBarang,
        harga,
        gambarBarang,
        jml_barang,
        alamat,
        kabupaten,
        provinsi,
        deskripsi,
        jaminan,
    });

    await newProduct
        .save()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => console.log('error is : ', err));
});

router.put('/:_id', (req, res) => {
    Product.findByIdAndUpdate(req.params._id, req.body)
    .then((product) => {
        res.json(product);
    })
    .catch((err) => console.log(err));
})

router.delete('/:_id', (req, res) => {
    Product.findByIdAndDelete(req.params._id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
