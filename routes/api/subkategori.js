'use strict';

const express = require('express');
const router = express.Router();
const Subkategori = require('../../models/Subkategori');
const Kategori = require('../../models/Kategori');

router.get('/', async (req, res) => {
    Subkategori.find().then((sub) => {
        res.json(sub);
    });
});

// router.post('/:_id', (req, res) => {
//     const { nama } = req.body;

//     const newSubkategori = {
//         nama,
//     };

//     Kategori.findById(req.params._id)
//         .then((kategori) => {
//             new Kategori(newSubkategori)
//                 .save()
//                 .then((sub) => {
//                     kategori.subkategori.unshift(sub);
//                     kategori.save().then((hasil) => res.json(hasil));
//                 })
//                 .catch((err) => res.status(404).json(err));
//         })
//         .catch((err) => res.status(404).json(err));
// });

router.post('/:_id', (req, res) => {
    console.log(req.body);
    const newSub = {
        nama: req.body.nama,
    };

    Kategori.findById(req.params._id)
        .then((kategori) => {
            new Subkategori(newSub)
                .save()
                .then((sub) => {
                    // kategori.music = subkategori._id; // Data will update
                    kategori.subkategori.unshift(sub); // Data will increase
                    kategori.save().then((hasil) => res.json(hasil));
                })
                .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err));
});

// ArtistData.findById(req.params.artis_id)
//         .then((artist) => {
//             new MusicData(newMusic)
//                 .save()
//                 .then((musics) => {
//                     // artist.music = musics._id; // Data will update
//                     artist.music.unshift(musics); // Data will increase
//                     artist.save().then((hasil) => res.json(hasil));
//                 })
//                 .catch((err) => res.status(404).json(err));
//         })
//         .catch((err) => res.status(404).json(err));
// });

module.exports = router;
