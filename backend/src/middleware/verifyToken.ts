import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"] as string | undefined;
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No se ha aportado ningún Token",
    });
  }
  try {
    const decoded: any = jwt.verify(token, config.secret);
    req.userId = decoded.id;

    // Comprobar el rol del usuario y sus permisos aquí
    if (decoded.rol === 'admin') {
      // El usuario tiene permisos de administrador
      next();
    } else {
      return res.status(403).json({ message: 'Acceso denegado: No tienes los permisos necesarios.' });
    }
  } catch (error) {
    return res.status(401).json({
      auth: false,
      message: "Token inválido",
    });
  }
}

export default verifyToken;