var request = require('request');

var ProfileViewer = function() {
	this.emailLogin = element(by.model('loginData.email'));
	this.passwordLogin = element(by.model('loginData.password'));
	this.submitButton = element(by.id('submit'));
	this.userEmail = element(by.id('profileEmail'));
	this.userPassword = element(by.id('profilePassword'));
	this.editEmail = element(by.id('editEmail'));
	this.updateButton = element(by.id('update'));
	this.ageField = element(by.model('user.age'));
	this.userAge = element(by.id('profileAge'))
	this.editButton = element(by.id('edit'))
	this.logoutButton = element(by.id('logout'))

	this.get = function() {
		browser.get('http://localhost:3000');
	}

	this.userLogin = function(email, password) {
		this.emailLogin.sendKeys(email)
		this.passwordLogin.sendKeys(password)
		this.submitButton.click()
	}

	this.editMode = function() {
		this.editButton.click()
	}

	this.editAge = function(age) {

		this.ageField.clear()
		this.ageField.sendKeys(age)
		this.updateButton.click()
	}

	this.logout = function() {
		this.logoutButton.click()
	}
}

describe('Profile rest app', function() {
	it('returns status code 200 when we GET / (root path) to check connection', function(done) {
		request.get('http://localhost:3000/', function(err, res, body) {
			expect(res.statusCode).toEqual(200)
			done();
		});
	});

	it('should login the user henderson', function() {
		var profileViewer = new ProfileViewer();
		profileViewer.get();
		profileViewer.userLogin('henderson.briggs@geeknet.net', '23derd*334');
		expect(profileViewer.userEmail.getAttribute('value')).toEqual('henderson.briggs@geeknet.net')
		expect(profileViewer.userPassword.getAttribute('value')).toEqual('23derd*334')
	});

	it('should enter edit mode when the edit button is clicked', function() {
		var profileViewer = new ProfileViewer();
		profileViewer.get();
		profileViewer.userLogin('henderson.briggs@geeknet.net', '23derd*334');
		profileViewer.editMode();
		expect(profileViewer.editEmail.getAttribute('value')).toEqual('henderson.briggs@geeknet.net');
	});

	it('should change the user henderson age to 99', function() {
		var profileViewer = new ProfileViewer();
		profileViewer.get();
		profileViewer.userLogin('henderson.briggs@geeknet.net', '23derd*334')
		profileViewer.editMode()
		profileViewer.editAge(99)
		expect(profileViewer.userAge.getAttribute('value')).toEqual('99')
	});

	it('should reset henderson back to original age of 30', function() {
		var profileViewer = new ProfileViewer();
		var userAge;
		profileViewer.get();
		profileViewer.userLogin('henderson.briggs@geeknet.net', '23derd*334')
		profileViewer.editMode()
		profileViewer.editAge(30)
		userAge = element(by.id('profileAge'))
		expect(profileViewer.userAge.getAttribute('value')).toEqual('30')
	});

	it('should log the henderson user out and return to the login page', function() {
		var profileViewer = new ProfileViewer();
		profileViewer.get();
		profileViewer.userLogin('henderson.briggs@geeknet.net', '23derd*334')
		profileViewer.logout()
		expect(profileViewer.emailLogin.getText()).toEqual('')
	});

})




