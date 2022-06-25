const UserSchema = require('../models/userSchema');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken'); 

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try{
        UserSchema.findOne({ email: req.body.email}, (error, user) => {
            console.log("Usuário", user)
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            console.log("A senha é válida?",validPassword)

            if(!validPassword) {
              return res.status(401).send({
                  message: "Login não autorizado"
              })
            }

            const token = jwt.sign({name: user.name}, SECRET );
            console.log('Token Criado:', token)
            res.status(200).send({message: "Login autorizado",token})

        })


    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    login
};