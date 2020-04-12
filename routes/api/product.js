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
    const { kategori, namaBarang, harga, gambarBarang, deskripsi } = req.body;
    const newProduct = new Product({
        kategori,
        namaBarang,
        harga,
        gambarBarang,
        deskripsi,
    });

    await newProduct
        .save()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => console.log('error is : ', err));
});

module.exports = router;
