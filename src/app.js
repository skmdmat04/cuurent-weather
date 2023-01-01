const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require("./utils/geocode")
const forecast=require('./utils/forecast')

const app=express();
const port=process.env.PORT || 3000

//Define path for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicPath))
app.get('',(req,res)=>res.render('index',{
    title:'Weather',
    name:'Suresh'
}))
app.get('/about',(req,res)=>res.render('about',{
    title:'About me',
    name:'Suresh Maurya'
}))
app.get('/help',(req,res)=>res.render('help',{
    helpText:'This is some helpful text.',
    title:'Help',
    name:"Suresh Maurya"
}))
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({
        error:"You must provide an address"
    })
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error)
      return res.send({error})
     forecast(latitude,longitude,(err,forecastData)=>{
        if(err)
        return res.send(err)
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
     })
    })  
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    return res.send({error:"You must provide a search term"})
    res.send({products:[]})
})

app.get('/help/*',(err,res)=>{
    res.render('404',{
        title:'404',
        name:'Suresh Maurya',
        errorMessage:"Help article not found!"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Suresh Maurya',
        errorMessage:"Page not found"
    })
})
app.listen(port,()=>console.log(`Server is up on port ${port}`))