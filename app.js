const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/isAuth')


const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth)

app.use(
  '/graphql',
  graphqlHttp({
    schema:graphqlSchema ,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

app.get('/',(req,res,next)=>{
    res.send('hi')
})

mongoose.connect("",{useNewUrlParser:true},()=>{
    console.log('Connected to MongoDB Atlas')
    app.listen(8000,()=>{
    console.log('Listening to port 8000')
})})
