const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/User");
const verifyToken = require("./verifyToken");

router.post("/signup", async (req, res, next) => {
    const { username, email, password,rol } = req.body;
    console.log(username, email, password,rol);
  
    const user = new User({
      username,
      email,
      password,
      rol,
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();
    res.status(200).json("Registro completado, Bienvenido:" + user.username);
  });
  
  router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("El email no existe");
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user._id, rol: user.rol}, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token });
  });

  router.get("/private", verifyToken, async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }
      user.password = undefined;
      res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  
  router.get("/public", verifyToken, async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }
      user.password = undefined;
      res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  
  module.exports = router;