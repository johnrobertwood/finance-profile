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

//Check if the db exists and if it doesn't then add the data from /data/users.json
if (!db.object.users) {
	db.object.users
	data.forEach(function(user) {
		db('users').push(user)
	})
}

//Display a login screen with username and password fields
app.get('/', function(req, res) {
	res.send("Login Screen")
})

//When the user submits the form, POST a query to database and validate the response username and pw
app.post('/login', function(req, res) {
	var email = req.body.email
	var password = req.body.password
	
	var user = db('users').find({ email: email });

//If the username or password is incorrect, redirect to login and display an error message
	if (user !== undefined && password === user.password) {
		res.send("Login Success!")
	} else if (user !== undefined && password !== user.password) {
		res.send("Password incorrect")
	} else if (!user) {
		res.send("Email was not found")
	} else {
		res.send("Something went wrong")
	}
})

//Else display a profile page that shows the user profile details and account balance

app.listen(port)

console.log("Server is up on port " + port)

