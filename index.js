const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const url = "https://5d7cca6fcb7ecb0014442082.mockapi.io"
const axios = require('axios')

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    try {
        let result = await axios({
            method: 'GET',
            url: url + '/user'
        }) 
        res.render('index', {
            users: result.data
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/', async (req,res) => {
    try {
        const { username, password } = req.body
        console.log(username, password)
        let result = await axios({
            method: 'GET',
            url: url + '/user'
        })
        let index = result.data.findIndex(user => {
            return user.username === username && user.password === password
        })
        if(index === -1) {
            res.render('index', {success: false, error: "username or password is not correct", users: result.data})
        } else {
            res.render('login-success')
        }
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(port, () => {
    console.log(`Server open port ${port}`)
})