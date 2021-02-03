const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = (userId) =>{
    return jwt.sign({id: userId},'batatafrita',{ expiresIn : '7d'}); // token - id , senha e expirar em 7 dias
}


router.get('/users', async (req,res)=> {
    try{
        const users = await Users.find({})
            return res.send(users)
    }
    catch(err){
        return res.status(500).send({error: "erro na consulta de usuários"})
    }

    
})

router.post('/users/create', async (req,res) =>{
    const { email,password } = req.body;
    if(!email || !password) return res.status(400).send({error: 'dados insuficiente'})

   try{
       if (await Users.findOne({email})) 
       return res.status(400).send({error:"usuário ja cadastrado"})

       const user = await Users.create(req.body);
       user.password = undefined

       return res.send({user,token: createUserToken(user.id)});
   }
   catch (err){
       return res.status(500).send({error: "erro ao buscar usuario"})
   }
})

router.post('/users/auth', async (req,res) =>{
    const { email,password } = req.body;

    if(!email || !password)
     return res.status(400).send({error: 'dados insuficiente'})
    try{
        const user = await Users.findOne({email}).select('+password')
        if(!user) 
        return res.status(400).send({error:"usuário não registrado"})

        const pass_ok = await bcrypt.compare(password,user.password);

        if(!pass_ok) 
        return res.status(401).send({error:"erro ao autenticar usuário"})

        user.password = undefined
        return res.send({user,token: createUserToken(user.id)})
        
    }
    catch (err){
        return res.status(500).send({error: 'erro ao buscar usuário!'})
    }


})



module.exports = router;
