var express = require('express')
var app = express()
var low = require('lowdb')
var storage = require('lowdb/file-async')
var bodyParser = require('body-parser')
var db = low('db.json', { storage: storage })
var data = require('./users.json')
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname))

//Check if the db exists and if it doesn't then add the data from /data/users.json
if (!db.object.users) {
	db.object.users
	data.forEach(function(user) {
		db('users').push(user)
	})
}

// Display a login screen with username and password fields
app.get('/', function(req, res) {
	res.json(data)
})

//When the user submits the form, POST a query to database and validate the response username and pw
app.post('/profile', function(req, res) {
	var email = req.body.email || req.email
	var password = req.body.password || req.password
	
	var user = db('users').find({ email: email })
	console.log(user)

// If username and password are correct display a profile page
// Else redirect to login and display an error message
	if (!user) {
		res.json({ success: false, message: 'Email not found'})
	} else if (user !== undefined && password !== user.password) {
		res.json({ success: false, message: 'Password Incorrect'})
	} else {
		res.json(user)
	}
})

app.post('/profile/edit', function(req, res) {
	var id = req.body.id
	var user = db('users').find({ _id: id })
	res.render('edit', user)
})

app.post('/profile/update', function(req, res) {

	db('users')
  .chain()
  .find({ _id: req.body.id })
  .assign({ picture: req.body.picture, age: req.body.age, eyeColor: req.body.eyeColor, 
  	name: { first: req.body.first, last: req.body.last }, company: req.body.company, 
  	email: req.body.email, password: req.body.password, phone: req.body.phone, 
  	address: req.body.address })
  .value()

  var user = db('users').find({ _id: req.body.id })

	res.render('profile', user)
})

app.listen(port)

console.log("Server is up on port " + port)

