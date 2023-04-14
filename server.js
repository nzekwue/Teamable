const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb')
const {isInvalidEmail,isEmptyPayload} = require('./validator')

const {DB_USER, DB_PASS, DEV} = process.env
const dbAddress = '127.0.0.1:27017'
const url = DEV ? `mongodb://${dbAddress}`: `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=company_db`
const client = new MongoClient(url)
const dbName = 'company_db'
const collName = 'employees'

app.use(bodyparser.json())

app.use('/', express.static(__dirname +'/dist'))

app.get('/get-profile', async function(req, res) {
        // connect to mongodb database
        await client.connect();
        console.log('Connected successfully to server')
         
        // initiates or get the db or collection
        const db = client.db(dbName)
        const collection = db.collection(collName)

        // get data from database
        const result = await collection.findOne({id: 1})
        console.log(result)
        client.close()

            response = {}

        if  (result !==null){
            response ={
                name: result.name,
                email: result.email,
                interest: result.interest
              }     
        }
         res.send (response)   
})

app.post('/Update-profile', async function(req, res) {
    const payload = req.body
    console.log(payload)

   
    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.send({error:"Invalid payload. couldn't save user profile successfully"})
    } else {
         // connect to mongodb database
          await client.connect();
         console.log('Connected successfully to server')

        // initiates or get the db or collection
        const db = client.db(dbName)
        const collection = db.collection(collName)

    // save payload data to the database
       payload['id'] = 1;
       const updatedValues = {$set: payload}
       await collection.updateOne({id: 1}, updatedValues, {upsert: true});
       client.close()
        res.send({info:"User profile data updated successfully"})
    }
   
})
       const server = app.listen(3000, function() {
       console.log("app listening on port 3000" )
})

    module.exports ={
        app,
        server
    }
        
    

    