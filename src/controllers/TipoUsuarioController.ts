import { TipoUsuario } from '..//models/TipoUsuario';
import {Request,Response} from 'express'

// Obtener todos los tipos de usuario
const getAllTipoUsuarios = async (req:Request,res:Response) => {
  try {
    const tipoUsuarios = await TipoUsuario.findAll();
    res.json(tipoUsuarios);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Crear un nuevo tipo de usuario
const createTipoUsuario = async (req:Request,res:Response) => {
  const { nombre, descripcion, estado } = req.body;
  try {
    const tipoUsuario = await TipoUsuario.create({ nombre, descripcion, estado });
    res.json(tipoUsuario);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Obtener un tipo de usuario por su ID
const getTipoUsuarioById = async (req:Request,res:Response) => {
  const { id } = req.params;
  try {
    const tipoUsuario = await TipoUsuario.findByPk(id);
    if (!tipoUsuario) {
      return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
    }
    res.json(tipoUsuario);
  } catch (error) {
    res.status(500).json({ error});
  }
};


const updateTipoUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  try {
    // Buscar el tipo de usuario por su ID
    const tipoUsuario: any = await TipoUsuario.findByPk(id);


    if (!tipoUsuario) {
      return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
    }

    // Actualizar las propiedades del tipo de usuario
    tipoUsuario.nombre = nombre as string;
    tipoUsuario.descripcion = descripcion as string;
    tipoUsuario.estado = estado as string;
    

    // Guardar los cambios en la base de datos
    await tipoUsuario.save();

    // Responder con el tipo de usuario actualizado
    res.json(tipoUsuario);
  } catch (error) {
    // Capturar errores y responder con un mensaje de error
    res.status(400).json({ error});
  }
};


// Eliminar un tipo de usuario por su ID
const deleteTipoUsuario = async (req:Request,res:Response) => {
  const { id } = req.params;
  try {
    const tipoUsuario = await TipoUsuario.findByPk(id);
    if (!tipoUsuario) {
      return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
    }
    await tipoUsuario.destroy();
    res.json({ message: 'Tipo de usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  getAllTipoUsuarios,
  createTipoUsuario,
  getTipoUsuarioById,
  updateTipoUsuario,
  deleteTipoUsuario,
};
