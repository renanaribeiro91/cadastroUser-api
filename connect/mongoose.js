const mongoose = require('mongoose')
const config = require('./config/config')

const urlConexão = config.bd_string;
const options = {useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(urlConexão,options);


mongoose.connection.on('error',(err)=>{
    console.log('Erro ao se conectar ao banco de dados'+err)
    
})
mongoose.connection.on('disconnected',()=>{
    console.log('aplicação desconectada')
})

mongoose.connection.on('connected',()=>{
    console.log('aplicação conectada')
})

module.exports = mongoose