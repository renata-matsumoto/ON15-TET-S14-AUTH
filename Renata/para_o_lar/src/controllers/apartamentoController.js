const LocadorSchema = require('../models/locadorSchema');
const ApartamentoSchema = require('../models/apartamentoSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET


const getAllApartamentos = async (req, res) => {
  ApartamentoSchema.find(function (error, apartamentos) {
    if(error) {
      res.status(500).send({
        message: error.message
      })
    }
    res.status(200).send(apartamentos)
  })
}

const createApartamento = async (req, res) => {
  try {
    const locadores = req.body.locador;

    const name = req.body. name;

    const apartamento = await ApartamentoSchema.create ({name});

    if(locadores) {
      await Promise.all(notes.map(async locador => {
        const locadorWithApartamento = new LocadorSchema({...locador, apartamento: apartamento._id});

        await locadorWithApartamento.save();

        apartamento.locador.push(locadorWithApartamento);

      } ));
    }

    await apartamento.save();

    return res.send({apartamento});
  } catch (error) {
    console.error(error)
  }
};

module.exports = {
getAllApartamentos,
createApartamento
}