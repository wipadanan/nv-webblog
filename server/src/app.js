let exprss = require('express')
const app = exprss() 
let bodyParser = require('body-parser')
const {sequelize} = require('./models')
const config = require('./config/config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./routes')(app)

app.get('/status', function (req, res){
    res.send('Hello nodejs server')
})

app.get('/hello/:person', function (req,res) {
    console.log('hello - ' + req.params.person)
    res.send('sey hello with ' + req.params.person)
})

// get user by id
app.get('/user/:userId', function (req, res) {
    res.send('ดูข้อมูลผู้ใช้งาน: '+ req.params.userId)
})
// get all user
app.get('/users', function (req, res) {
    res.send('เรียกข้อมูล ผู้ใช้งานทั้งหมด')
})

app.listen(port, function () {
    console.log('server running on ' + port)
})

// create user
app.post('/user/', function (req, res) {
    res.send('ทำการสร้างผู้ใช้งาน: ' + JSON.stringify(req.body))
})
// edit user
app.put('/user/:userId', function (req, res) {
    res.send('ทำการแก้ไขผู้ใช้งาน: ' + req.params.userId + ' : ' +
    JSON.stringify(req.body))
})
// delete user
app.delete('/user/:userId', function (req, res) {
    res.send('ทำการลบผู้ใช้งาน: ' + req.params.userId + ' : ' +
    JSON.stringify(req.body))
})

let port = process.env.PORT || config.port
sequelize.sync({force: false}).then(() => {
    app.listen(port, function () {
        console.log('Server running on ' + port)
    })
})