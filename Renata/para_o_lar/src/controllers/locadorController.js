const LocadorSchema = require('../models/locadorSchema');
const ApartamentoSchema = require('../models/apartamentoSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET


const getAllLocadores = async (req, res) => {
  LocadorSchema.find(function (error, locadores) {
    if(error) {
      res.status(500).send({
        message: error.message
      })
    }
    res.status(200).send(locadores)
  })
}

const createLocador = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const emailExist = await LocadorSchema.exists({email: req.body.email});
  
  
  if(emailExist) {
    res.status(401).send({
      "Message" : "Email já cadastrado"
    })
  }
  
  try{
     
    const {name, email, role, apartamento} = req.body

    const newLocador = await LocadorSchema.create({name, email, role});
    console.log("Locador criado com Sucesso", newLocador)

    if(apartamento) {
      const newApartamento = await new ApartamentoSchema({name: apartamento, locador: newLocador});
      console.log("Novo Apartamento salvo com sucesso", newApartamento)

      await newApartamento.save();

      newLocador.apartamento = newApartamento._id;
    }

    const savedLocador = await newLocador.save();
    console.log("Locador Salvo no Banco", savedLocador)

    if(savedLocador){
      res.status(201).send({
        "message": "Locador criado com sucesso",
        savedLocador
      })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
}


module.exports = {
getAllLocadores,
createLocador
}