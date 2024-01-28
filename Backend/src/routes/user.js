const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware");
const { generarTokenRestablecimiento } = require("../authservice");
const { sendEmail } = require("../sendfile");

router.post("/solicitudResetPass", async (req, res) => {
  try {
    const email = req.body.email; // Definir la variable email correctamente
    const token = await generarTokenRestablecimiento(email);
    sendEmail(
      "73952269@lima.coar.edu.pe",
      "Restablecimiento de contraseña",
      "Cambiar contraseña .." + token
    );
    res.send("Se ha enviado un enlace de restablecimiento de contraseña");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  try {
    res.send("Exitoso");
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new userSchema(req.body);
    await newUser.save();
    res.status(201).send("Usuario registrado con éxito");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error("Credenciales inválidas");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/user", (req, res) => {
  const user = new userSchema(req.body);
  user.save().then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json({ message: error });
  });
});

router.get("/user", (req, res) => {
  userSchema.find().then((data) => {
    res.json(data);
  }).catch((error) => {
    res.json({ message: error });
  });
});

router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

module.exports = router;




