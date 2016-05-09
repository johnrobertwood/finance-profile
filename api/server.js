var express = require('express')
var app = express()
var low = require('lowdb')
var storage = require('lowdb/file-async')
var bodyParser = require('body-parser')
var db = low('db.json', { storage: storage })
var data = require('../data/users.json')
var port = process.env.PORT || 3000
var exports = module.exports = {}

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
app.post('/login', function(req, res) {
	var email = req.body.email || req.email
	var password = req.body.password || req.password
	
	var user = db('users').find({ email: email })
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
	res.json(user)
})

app.post('/profile/update', function(req, res) {

	db('users')
  .chain()
  .find({ email: req.body.email })
  .assign({ picture: req.body.picture, age: req.body.age, eyeColor: req.body.eyeColor, 
  	name: { first: req.body.name.first, last: req.body.name.last}, company: req.body.company, 
  	email: req.body.email, password: req.body.password, phone: req.body.phone, 
  	address: req.body.address })
  .value()
  var user = db('users').find({ email: req.body.email })

	res.json(user)
})

var server = app.listen(port)

console.log("Server is up on port " + port)

exports.closeServer = function() {
	server.close()
}

