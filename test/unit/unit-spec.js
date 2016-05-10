var request = require('request')
var expressApi = require('../../api/server')
var base_url = 'http://localhost:3000/'

describe("Form submission test", function() {

  describe("GET /", function() {

    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })
  })

  describe("POST /profile", function() {

    var formData = {
      email: 'henderson.briggs@geeknet.net',
      password: '23derd*334'
    }

    it('returns status code 200 and text/html content', function(done) {
      request.post({url: 'http://localhost:3000/profile', form:formData}, function(err, httpResponse, body) {

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.headers['content-type']).toBe('text/html; charset=utf-8')
        done()
      })
    })

  })

})