const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema/index')
const reducer = require('./graphql/resolvers/index')


const app = express()

app.use(bodyParser.json())



app.use(
  '/graphql',
  graphqlHttp({
    schema:graphqlSchema ,
    rootValue: reducer,
    graphiql: true
  })
);

app.get('/',(req,res,next)=>{
    res.send('hi')
})

mongoose.connect("mongodb+srv://user1:7zhPFgiyCGB9yEse@firstcluster-wzmw4.mongodb.net/graphql?retryWrites=true",{useNewUrlParser:true},()=>{
    console.log('Connected to MongoDB Atlas')
    app.listen(3000,()=>{
    console.log('Listening to port 3000')
})})