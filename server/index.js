const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const scrapers = require('./scrapers');



app.use(bodyParser.json());
app.use(function(req, res, next) { //disables security rules for local development
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/players', async (req, res) => {
    const players = [
        {name: "Stephen Curry", image: "http://"},
        {name: "LeBron James", image: "http://"},
        {name: "Zion Williamson", image: "http://"},
    ];
    //todo get this from database
    res.send(players);
})

app.post('/players', async (req, res) => {
    console.log(req.body);
    const playerData = await scrapers.scrapePlayerPage(req.body.playerURL);
    console.log({playerData});

    res.send('success');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})