const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { error } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define path for Express config
const publicDirectoryPath=path.join(__dirname, '../public')//מביא את הדרך לקובץ__dirname
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs') //פקודה שמגדירה את מנוע התבניות שיש להשתמש בו בכדי להציג קבצי תבניות (views) ביישום שרת שלך
app.set('views', viewsPath) //מגדירה את המיקום של תיקיית התבניות (views) של היישום שלך. המיקום נמצא במשתנה viewsPath, שמכיל את הנתיב המלא לתיקיית התבניות שלך במערכת הקבצים.
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Yael Aflalo'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'about me',
        name:"Yael Aflalo"
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        helpText: 'this is some helpful text.',
        title: 'help',
        name: 'Yael Aflalo'
        
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ //שמים ריטרן כי אי אפשר להחזיר שתי RES 
            error:'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forcast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products',(req, res)=>{
    if (!req.query.search) {
        return res.send({ //שמים ריטרן כי אי אפשר להחזיר שתי RES 
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Yael Aflalo',
        errorMessage: 'help article not found.'
     })
    })

app.get('*', (req,res) => { //חייב להיות למטה כי קודם הוא מנסה את כל האלה שלמעלה ואז אותו אם הוא לא מצא אף אחד
    res.render('404',{
       title:'404',
       name: 'Yael Aflalo',
       errorMessage: 'page not found.'
    })
})


//app.com
//app.com/hellp
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})













//ככה עשיתי לפני שידעתי לקשר דפי html
// app.get('/help', (req, res) => {
    //     res.send([{
    //         name: 'yael',
    //         age: 19
    //     }])
    // })
    
    // app.get('/about', (req, res) => {
    //     res.send('<h1>about page<h1>')
    // })
    