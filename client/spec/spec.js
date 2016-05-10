var request = require('request')

describe('Profile rest app', function() {
	var emailLogin = element(by.model('loginData.email'))
	var passwordLogin = element(by.model('loginData.password'))
	var submitButton = element(by.id('submit'))
	var userEmail = element(by.id('profileEmail'))
	var userPassword = element(by.id('profilePassword'))

	function userLogin(email, password) {
		emailLogin.sendKeys(email)
		passwordLogin.sendKeys(password)
		submitButton.click()
	}

	function editMode() {
		var editButton = element(by.id('edit'))
		editButton.click()
	}

	function editAge(age) {
		var updateButton = element(by.id('update'))
		var ageField = element(by.model('user.age'))
		ageField.clear()
		ageField.sendKeys(age)
		updateButton.click()
	}

	function logout() {
		var logoutButton = element(by.id('logout'))
		logoutButton.click()
	}

	beforeEach(function() {
		browser.get('http://localhost:3000')
	});

	it('returns status code 200 when we GET / (root path) to check connection', function(done) {
		request.get('http://localhost:3000/', function(err, res, body) {
			expect(res.statusCode).toEqual(200)
			done()
		})
	})

	it('should login the user henderson', function() {
		userLogin('henderson.briggs@geeknet.net', '23derd*334')
		expect(userEmail.getAttribute('value')).toEqual('henderson.briggs@geeknet.net')
		expect(userPassword.getAttribute('value')).toEqual('23derd*334')
	})

	it('should enter edit mode when the edit button is clicked', function() {
		var emailField = element(by.model('user.email'))
		userLogin('henderson.briggs@geeknet.net', '23derd*334')
		editMode();
		expect(emailField.getAttribute('value')).toEqual('henderson.briggs@geeknet.net')
	})

	it('should change the user henderson age to 99', function() {
		userLogin('henderson.briggs@geeknet.net', '23derd*334')
		editMode()
		editAge(99)
		var userAge = element(by.id('profileAge'))
		expect(userAge.getAttribute('value')).toEqual('99')
	})

	it('should reset henderson back to original age of 30', function() {
		userLogin('henderson.briggs@geeknet.net', '23derd*334')
		editMode()
		editAge(30)
		var userAge = element(by.id('profileAge'))
		expect(userAge.getAttribute('value')).toEqual('30')
	})

	it('should log the henderson user out and return to the login page', function() {
		userLogin('henderson.briggs@geeknet.net', '23derd*334')
		logout()
		expect(emailLogin.getText()).toEqual('')
	})

})


