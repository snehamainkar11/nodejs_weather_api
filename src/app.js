const express=require('express')
const app=express();
const hbs=require('hbs')
const path = require('path');
const port=process.env.PORT || 8000;

const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

const weatherData =require('../utils/weatherData');

console.log(path.join(__dirname,'../public/css/style.css'));

app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');

const partialsPath= path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

app.get("/",function(req,res){
    res.render("index",{
        title:"Weather App"
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
    weatherData(address,(error,{temperature,description,cityName}={})=>{
        if(error) {
            return res.send({error})
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*",function(req,res){
    res.render("404",{
        title:"Page Not Found"
    });
});

app.listen(port,(req,res)=>{
    console.log(`App is running on ${port}`);
});