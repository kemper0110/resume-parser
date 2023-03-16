var express = require('express');
var router = express.Router();
var Parser = require("../utils/parser")

router.get("", async (req, res) => {
    try{
        const link = req.query.link;
        const hhResponse = await fetch(link);
        if(hhResponse.status !== 200)
            throw new Error("Bad request to your link")
        const text = await hhResponse.text();
        const parsed = new Parser(text).getInfo()
        res.send({...parsed, "link": link});
    } catch(e) {
        console.log(e);
        res.status(400);
        res.send(e.message);
    }
})

module.exports = router;
