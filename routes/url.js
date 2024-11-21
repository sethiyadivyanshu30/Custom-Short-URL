const express = require('express');
const shortid = require('shortid');

const { handleGenerateShortUrl, 
    handleGetAnalytics, 
    handleRedirectURL} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

router.get('/:shortId', handleRedirectURL);

module.exports = router;