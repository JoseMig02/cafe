import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface User {
    id: string;
    tipoUsuarioID: number;
    // Otras propiedades del usuario si las hay
}

declare global {
    namespace Express {
        interface Request {
            user?: User; // Definimos la propiedad user opcional en el objeto Request
        }
    }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headertoken = req.headers['authorization'];

    if (headertoken != undefined && headertoken.startsWith('Bearer')) {
        try {
            const bearerToken = headertoken.slice(7);
            const decodedToken = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123') as User;
            
            // Guardar la información del usuario en req
            req.user = decodedToken;
            console.log(req.user)
            next();
            
        } catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            });            
        }
    } else {
        res.status(401).json(
            'Acceso denegado'
        );
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Verificar si el usuario es administrador
    const user = req.user as User; // Obtenemos la información del usuario guardada en req
    
    if (user && user.tipoUsuarioID === 5) {
        // Si el usuario es administrador, pasamos al siguiente middleware
        next();
    } else {
        // Si el usuario no es administrador, devolvemos un error de autorización
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere permisos de administrador.'
        });
    }
}

export { validateToken, isAdmin };
