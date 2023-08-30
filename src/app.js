const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');
const app = express();
//define paths for express config
const pdir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(pdir));

app.get('', (req,res)=>{
    res.render('index', {
        title : 'Weather App',
        name: 'Anushka Painuli'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title : 'About page',
        name: 'Anushka Painuli'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title : 'Help page',
        name: 'Anushka Painuli'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "Must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, {temperature, feelslike})=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                location,
                temperature,
                feelslike
            });
        });
    });
});

app.get('/products', (req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: "Must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('errors', {
        error : 'Help page not found'
    });
})
app.get('*',(req,res)=>{
    res.render('errors', {
        error : '404 page not found'
    });
})
app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
});
