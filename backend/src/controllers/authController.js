const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/User");
const verifyToken = require("./verifyToken");

router.post("/signup", async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
  
    const user = new User({
      username,
      email,
      password,
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();
  
    // const token = jwt.sign({ id: user._id, company:"company 1" }, config.secret, {
    //   expiresIn: 60 * 60 * 24,
    // });
  
    res.status(200).json("Registro completado");
  });
  router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("The email doesn t exists");
    }
  
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }
  
    const token = jwt.sign({ id: user._id}, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
  
    console.log("Generated Token:", token); // Agrega este registro
    res.json({ auth: true, token });
  });

  router.get("/me", verifyToken, async (req, res, next) => {
    try {
      // Obtener el usuario desde la base de datos utilizando req.userId
      console.log("UserID in /me route:", req.userId);
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }
  
      // Eliminar la contraseña antes de enviar el usuario
      user.password = undefined;
  
      res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  

router.get('/inicio', verifyToken, async (req, res) => {
  let _id = req.userId;
  let usuario = await User.findOne({_id})
  res.json({usuario})
})

  module.exports = router;