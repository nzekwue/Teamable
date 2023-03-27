const {isInvalidEmail,isEmptyPayload} = require('../validator')

test('valid email', function(){
     const testPayload ={
        name: 'test.name',
        email: 'test.email@example.com',
        interest: 'testing'
     }

     const result = isInvalidEmail(testPayload)
     expect(result).toBe(false)
})

test('Invalid email', function(){
    const testPayload ={
       name: 'name',
       email: 'test.email',
       interest: 'testing'
    }

    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('isEmptyPayload', function(){
    const testPayload ={}
    const result = isEmptyPayload(testPayload) 
    expect(result).toBe(true) 
})

test('non-EmptyPayload', function(){
    const testPayload ={
        name: 'name',
       email: 'test.email',
       interest: 'testing' 
    }
    const result = isEmptyPayload(testPayload) 
    expect(result).toBe(false) 
})