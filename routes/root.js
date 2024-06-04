const express = require('express');
const router = express.Router();
const path = require('path');
const { verifyJWT } = require('../middlewares/auth.middleware');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/about', verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
})

router.get('/contact', verifyJWT, (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'contact.html'));
})

router.get('/fillReview', verifyJWT, (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'fillReview.html'));
})

module.exports = router;