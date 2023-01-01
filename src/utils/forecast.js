const request=require('postman-request');
const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=217206d77922002612454917278bccd6&query=${latitude},${longitude}`;
    request({url,json:true},(error,res,body)=>{
     if(error)
     callback('Unable to connect to weather service',undefined)  
     else if(body.error)
     callback("Unable to find location",undefined)
    //  else return callback(undefined,res.body.current)
        callback(undefined,`Weather is ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out-side. There is a ${body.current.precip*100}% chances of rain.`) 
    })
}
module.exports=forecast
