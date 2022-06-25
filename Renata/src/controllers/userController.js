const UserSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('authorization')
  console.log(authHeader)
  const token = authHeader.split(' ')[1];
  console.log('Apenas o token', token)

  if (!token) {
    return res.status(401).send("Erro no header")
  }
    
  jwt.verify(token, SECRET, function(error) {
    if (error) {
      return res.status(403).send('Não autorizado');
  }
})

  UserSchema.find(function (error, users) {
    if(error) {
      res.status(500).send({ message: error.message })
    }
      res.status(200).send(users)
  }) 
}
// const getAll = async (req, res) => {
//   UserSchema.find(function (err, users) {
//     if (err) {
//       res.status(500).send({
//         message: err.message
//       })
//     }
//     res.status(200).send(users)
//   })
// };

const createUser = async (req, res) => {

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  try {
    const {
      name,
      email,
      password
    } = req.body;

    const newUser = new UserSchema({
      name: name,
      email: email,
      password: password
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)


  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAll,
  createUser
};