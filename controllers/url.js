const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'URL is required'});
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    });
    return res.json({id: shortId});
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory
    });
}

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
        {
            $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }},{new : true});
    
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }
    
        return res.redirect(entry.redirectURL);  
    }
    catch (err) {
        console.error("Error processing the request:", err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
    handleRedirectURL
}