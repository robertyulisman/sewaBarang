'use strict'

const express = require('express');
const router = express.Router();
const Kategori = require('../../models/Kategori');

router.get('/', async (req, res) => {
    Kategori.findById()
    .then((kategori) => {
        res.json(kategori);
    })
})
// router.get('/:id', Kategori.findById)
// router.post('/', Kategori.create)
// router.patch('/:id', Kategori.update)
// router.delete('/:id', Kategori.delete)

module.exports = router