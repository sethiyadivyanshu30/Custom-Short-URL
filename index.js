const express = require('express');

const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url')

const PORT = 8001;
const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("Connected"))

app.use(express.json());

app.use('/url', urlRoute);

// app.get("/:shortId", async (req, res) => {
//     const shortId = req.params.shortId;
//     try {
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//         {
//             $push: {
//             visitHistory: {
//                 timestamp: Date.now()
//             }
//         }},{new : true});
    
//         if (!entry) {
//             return res.status(404).send("Short URL not found");
//         }
    
//         res.redirect(entry.redirectURL);  
//     }
//     catch (err) {
//         console.error("Error processing the request:", err);
//         res.status(500).send("Internal server error");
//     }
// })

app.listen(PORT, () => console.log(`Server Connected at Port: ${PORT}`));