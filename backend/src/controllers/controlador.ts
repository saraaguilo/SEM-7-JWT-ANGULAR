import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { Router } from 'express';
const router = Router();

import jwt from 'jsonwebtoken';
import config from '../config'; 

import User from '../models/User';


interface AuthenticatedRequest extends Request {
    userId?: string;
  }

  export async function signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("El email no existe");
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }
  
    // Generar un nuevo token con el rol del usuario
    const token = jwt.sign({ id: user._id, rol: user.rol }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
  
    return res.json({ auth: true, token });
  }

export async function signup(req: Request, res: Response): Promise<Response> {
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
    return res.status(200).json("Registro completado, Bienvenido:" + user.username);
}

export async function priv(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ error: "No se encontró el usuario" });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        return  res.json({ user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
}
export async function publ(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ error: "No se encontró el usuario" });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        return res.json({ user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
}
  
export default router; 