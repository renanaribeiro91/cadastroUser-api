const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')


router.get('/',auth,(req,res)=> {
    console.log(res.locals.auth_data) //saber qual usuário esta batendo na rota
    return res.send({message: `aqui tem uma mensagem privada`})
})

router.post('/',(req,res) =>{
    return res.send({message: `Tudo ok com o metodo POST da raiz!`})
})

module.exports = router;




