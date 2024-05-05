import {Request,Response} from 'express'
import bcrypt from 'bcrypt';
import { Usuario } from '../models/Usuario';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';







  const NewUser = async (req:Request,res:Response)=>{
    const { nombre, cedula, tipoUsuarioID, limiteCredito, estado, username, email, password,fechaRegistro } = req.body;
// validamos si el usuario existe en la base de datos

      const user = await Usuario.findOne({where:{
        email:email
    }})

    if(user){
        return res.status(400).json({
            msg: 'Correo existente'
        })
    }
    if(!nombre || !cedula ||!limiteCredito || !estado || !username || !email || !password ||!fechaRegistro){
        return res.status(400).json({ msg: 'Faltan campos obligatorios' });

    }
        const hashedPassword = await bcrypt.hash(password, 10)

        try {
           // guardamos usuario en la base de datos
           const nuevoUsuario = await Usuario.create({
            nombre,
            cedula,
            tipoUsuarioID:7,
            limiteCredito,
            estado,
            username,
            fechaRegistro,
            email,
            password: hashedPassword,
          });
          const idUsuario = nuevoUsuario.getDataValue("id")
          console.log(idUsuario)
            res.json({
                msg: 'Usuario ' + nombre +' creado exitossamente',
                idUsuario: idUsuario,
                
            
            })
        
            
        } catch (error) {
            res.status(400).json({
                msg: 'ocurrio un error',
                error
            })
            
        }
   
}
const loginUser = async (req:Request,res:Response)=>{
    const {email,password} = req.body
    //validamos si el usuario existe en la bbdd
    const user:any = await Usuario.findOne({where:{  email}})

    if(!user){
        return res.status(400).json({
            msg: 'No exixte un usuario con el correo '+ email+' en la Base de datos'
        })
    }

    //validamos password
     const passworvalid = await bcrypt.compare(password,user.password)
    if(!passworvalid){
        return res.status(400).json({
        msg:'Password Incorrecta'

        })
    }

    //generamos token

     const token = jwt.sign({
        
    id: user.id,
    tipoUsuarioID:user.tipoUsuarioID,
    username: user.username

    },process.env.SECRET_KEY || 'pepito123',{
      //  expiresIn:'10000'
    })
 
     return res.status(200).json(token)
    
}

// Obtener todos los usuarios
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message:  error});
    }
};

// Obtener un usuario por su ID
const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const usuario = await Usuario.findByPk(userId);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Actualizar un usuario por su ID
const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, cedula, tipoUsuarioID, limiteCredito, estado, username, fechaRegistro, email, password } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        const hashedPassword = await bcrypt.hash(password, 10)
        if (usuario) {
            await usuario.update({
                nombre,
                cedula,
                tipoUsuarioID,
                limiteCredito,
                estado,
                username,
                fechaRegistro,
                email,
                password:hashedPassword
            });
            res.json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


// Eliminar un usuario por su ID
const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const usuario = await Usuario.findByPk(userId);
        if (usuario) {
            await usuario.destroy();
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
const subirImagenUsuario = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Verificar si el empleado existe
      const usuario:any = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si se proporcionó una imagen
      if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
      }
  
      const imagen = req.file;
    console.log(req.file)

      // Validar la extensión del archivo
      const extension = path.extname(imagen.originalname).toLowerCase();

      if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {

        fs.unlinkSync(imagen.path); // Eliminar archivo no válido
        return res.status(400).json({ error: 'La imagen debe ser de tipo PNG o JPG' });

      }
  
      // Guardar la imagen en el servidor
      const nombreArchivo = `${Date.now()}${extension}`;
      const rutaArchivo = path.join(__dirname, '../../src/uploads', nombreArchivo);
  
      fs.renameSync(imagen.path, rutaArchivo);
  
      // Actualizar el campo imagen del empleado en la base de datos
     usuario.img = nombreArchivo;
      await usuario.save();
  
      res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
    } catch (error) {
      console.error('Error al subir la imagen del usuario:', error);
      res.status(500).json({ error: 'Error al subir la imagen del usuario' });
    }
  };
  
  const obtenerImagenusuario = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario:any = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'usuario no encontrada' });
      }
      if (!usuario.img) {
        return res.status(404).json({ msg: 'El usuario no tiene una imagen asociada' });
      }
      const rutaImagen = path.join(__dirname, '../../src/uploads', usuario.img);
      res.sendFile(rutaImagen);
    } catch (error) {
      
      res.status(500).json({ error: 'Error al obtener la imagen del usuario' });
    }
  };
  


export {
    NewUser,
    loginUser,
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    subirImagenUsuario,
    obtenerImagenusuario
}