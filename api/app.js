var express = require('express')
var app = express()
var low = require('lowdb')
var storage = require('lowdb/file-async')
var bodyParser = require('body-parser')
var db = low('db.json', { storage: storage })
var data = require('../data/users.json')
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', '../client/views')


//Check if the db exists and if it doesn't then add the data from /data/users.json
if (!db.object.users) {
	db.object.users
	data.forEach(function(user) {
		db('users').push(user)
	})
}

//Display a login screen with username and password fields
app.get('/', function(req, res) {
	res.render("index")
})

app.get('/profile', function(req, res) {

	res.send(req.body)
})

//When the user submits the form, POST a query to database and validate the response username and pw
app.post('/profile', function(req, res) {
	var email = req.body.email
	var password = req.body.password
	
	var user = db('users').find({ email: email })

//If username and password are correct display a profile page
//Else redirect to login and display an error message
	if (user !== undefined && password === user.password) {
		res.render('profile', user)
	} else if (user !== undefined && password !== user.password) {
		res.redirect('/')
	} else if (!user) {
		res.redirect('/')
	} else {
		res.redirect('/')
	}
})

app.put('/profile/update', function(req, res) {
	var email = req.body.email
	var newPicture = req.body.newPicture
	var firstName = req.body.firstName
	var lastName = req.body.lastName
	var newPassword = req.body.newPassword
	var newPhone = req.body.newPhone
	var newAddress = req.body.newAddress
	db('users')
	  .chain()
	  .find({ email: email })
	  .assign({ password: newPassword, phone: newPhone, 
	  	address: newAddress, name: { first: firstName, last: lastName }})
	  .value()

	res.json('Put request')
})

app.listen(port)

console.log("Server is up on port " + port)

