const path=require('path')
const express=require('express')
const hbs= require('hbs')
const geocode=require('../src/utils/geocode')
const forecast=require('../src/utils/forecast')


const app=express()
const port=process.env.PORT || 3000
//Define Paths for express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Siddhant'
    })
})
 
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Siddhant'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:"Please leave a message in the comment section with your query",
        name:'Siddhant'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    // res.send(
    //     {
    //     forecast:50,
    //     location:req.query.address
        
    // }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error:"unable to fetch location"})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error:"unable to fetch weather"})
            }
            //   console.log(location)
            //   console.log(forecastData)
              return res.send({location,forecastData,address:req.query.address})
        })
    })
    // )
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name:'Siddhant'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'Siddhant'
    })
})


app.listen(port,()=>{
    console.log('server is up on port '+port)
})