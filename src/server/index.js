require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
})

// API call to get each rover's data base on their name and data of photos. If not, return to localhost:port
app.get('/:name', async (req, res) => {
    const name = req.params.name.toLowerCase();
    let date = '2010-03-21';
    let url;
    switch (name) {
        case 'spirit':
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`
            break;
        case 'curiosity':
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/latest_photos?api_key=${process.env.API_KEY}`
            break;
        case 'opportunity':
            url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`
            break;
        default:
            url = `localhost:${port}`
    }

    try {
        const results = await fetch(url)
            .then(res => res.json())
        res.send({results})
    } catch (err) {
        console.log('Error Message', err);
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))