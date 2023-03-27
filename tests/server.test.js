const {app,server} = require('../server.js')
const request = require('supertest')

test("test request with a valid payload", async function() {
    const testPayload ={
        name: 'test.name',
        email: 'test.email@example.com',
        interest: 'testing'
     }

     const response = await request(app)
            .post('/Update-profile')
            .send(testPayload)

            console.log(response.body)
        expect(response.status).toBe(200)   
        expect(response.body).toHaveProperty("info")
        expect(response.body.info).toBe("User profile data updated successfully")
         
        server.close()
})

test("test request with  invalid payload", async function() {
    const testPayload ={} 
    const response = await request(app)
            .post('/Update-profile')
            .send(testPayload)

            console.log(response.body)
        expect(response.status).toBe(200)   
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Invalid payload. couldn't save user profile successfully")
         
        server.close()

})