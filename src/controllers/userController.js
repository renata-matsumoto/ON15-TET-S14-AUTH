const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      res.status(200).send(users)
  }) 
};

// const getAll = async (req, res) => {
//   UserSchema.find(function (err, users) {
//     if(err) {
//       res.status(500).send({ message: err.message })
//     }
//       res.status(200).send(users)
//   }) 
// };

// const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     if(!name.name && !email.email) {
//       res.status(404).send({
//         "message": "Campos obrigatórios precisam ser preenchidos"
//       })
//     }

//     const newUser = await UserSchema.create({ name, email, password})

//     const savedUser = await newUser.save();

//       res.status(201).send({
//         "message": "User criado com sucesso",
//         savedUser
//       });

//   } catch(e) {
//     console.error(e);
//   };
// };

// const createUser = async (req, res) => {
//   try {
//     const newUser = new UserSchema({ name: req.body.name, 
//         email: req.body.email, 
//         password: req.body.password
//       });

//     const savedUser = await newUser.save();

//       res.status(201).send({
//         "message": "User criado com sucesso",
//         savedUser
//       });

//   } catch(e) {
//     console.error(e);
//   };
// };

const createUser = async (req, res) => {ß
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  // const hashedPassword = "72349073jkasdajg26312!!@44"
  req.body.password = hashedPassword;

  // "senhadificil" = "72349073jkasdajg26312!!@44"

  const emailExists = await UserSchema.exists({ email: req.body.email });  

  if(emailExists) {
    res.status(401).send({
      "message": "Email já cadastrado"
    })
  }

  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();

    res.status(201).send({
      "message": "User criado com sucesso",
      savedUser
    });
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: e.message
  });
  };
};

module.exports = {
  getAll,
  createUser
};
