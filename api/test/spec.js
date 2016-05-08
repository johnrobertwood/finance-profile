describe('Profile rest app', function() {
	var emailLogin = element(by.model('loginData.email'))
	var passwordLogin = element(by.model('loginData.password'))
	var submitButton = element(by.id('submit'))

	var userEmail = element(by.binding('user.email'))
	var userPassword = element(by.binding('user.password'))

	function userLogin(email, password) {
		emailLogin.sendKeys(email)
		passwordLogin.sendKeys(password)
		submitButton.click()
	}

	beforeEach(function() {
		browser.get('http://localhost:3000');
	});

	it('should login henderson', function() {

		userLogin('henderson.briggs@geeknet.net', 'password');

		expect(userEmail.getText()).toEqual('henderson.briggs@geeknet.net');
		expect(userPassword.getText()).toEqual('password');
	})
})