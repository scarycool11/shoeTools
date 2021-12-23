//Connect to mongoDB and start server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config() //load in enviroment
const MongoClient = mongodb.MongoClient //Get access to mongo client

const port = process.env.Port || 8000 //connect to port if cannot be reached try port 8000

MongoClient.connect(
    process.env.RESTUSERS_DB_URI,  //connect to Database
    {maxPoolSize: 50,                             //Set options for access
    wtimeoutMS: 250,
    useNewUrlParser: true }
    
    )

    .catch(err => {
        console.error(err.stack) //check for errors
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, () => {
            console.log('listening on port ${port}')
        })
    })