'use strict';

const express = require('express');
const router = express.Router();
const Kategori = require('../../models/Kategori');

router.get('/', async (req, res) => {
    Kategori.find()
        .populate({
            path: 'subkategori',
            model: 'Subkategori',
        })
        .then((kategori) => {
            res.json(kategori);
        });
});

router.post('/', async (req, res) => {
    const { nama } = req.body;
    const newKategori = new Kategori({
        nama,
    });
    await newKategori
        .save()
        .then((kategori) => res.status(200).json(kategori))
        .catch((err) =>
            res.status(400).json({ sukses: false, message: 'error', err }),
        );
});
// router.get('/:id', Kategori.findById)
// router.post('/', Kategori.create)
// router.patch('/:id', Kategori.update)
// router.delete('/:id', Kategori.delete)

module.exports = router;
