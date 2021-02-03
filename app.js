const express = require('express');
const app = express();
const bodyParser = require('body-parser')

require('./config/config')
require('./connect/mongoose')




app.use(bodyParser.json());

const indexRouter = require('./routes/indexroutes')
const userRouter = require('./routes/userroutes')

app.use(indexRouter)
app.use(userRouter)

app.listen(3000, () =>{
    console.log('Server esta on na porta 3000')
});

module.exports = app;