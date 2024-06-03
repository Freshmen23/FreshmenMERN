const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
})

router.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'contact.html'));
})

router.get('/fillReview', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'fillReview.html'));
})

module.exports = router;