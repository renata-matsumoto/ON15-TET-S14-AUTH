const LocadorSchema = require('../models/locadorSchema');
const ApartamentoSchema = require('../models/apartamentoSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const login = (req, res) => {

  try {
    LocadorSchema.findOne({email: req.body.email}, (error, locador) => {
      console.log("Usuário" , locador) 

      if(!locador) {
        return res.status(401).send({
          message: "User não encontrado", 
          email: `${req.body.email}`
        })
      }

      const validPassword = bcrypt.compareSync(req.body.password, locador.password);

      console.log("A senha é válida?", validPassword)

      if(!validPassword) {
        return res.status(401).send({
          "message": "Login não autorizado",
          "statusCode": 401
        })
      }

      const token = jwt.sign({name: locador.name}, SECRET);
      console.log("Token Criado", token);

      res.status(200).send({
        "message": "Login autorizado",
        token
      });
    })
  } catch (error) {
    console.error(error)
  }
};

module.exports = {
  login
}