const request=require('request')


const forecast=(latitude,longitude,callback)=>{
    const url="http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=81db2a37af4c92bd27e1eeda6e073d4d&units=metric"
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.message)
        callback('Unable to find location..Please try again!', undefined)
        else
        callback(undefined,"It is currently "+body.main.temp+" degrees out")
        
    }) 

}


module.exports=forecast