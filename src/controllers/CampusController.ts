import { Request, Response } from 'express';
import { Campus } from '../models/Campus';

// Obtener todos los campus
const obtenerCampus = async (req: Request, res: Response) => {
  try {
    const campus = await Campus.findAll();
    res.json(campus);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los campus' });
  }
};

// Obtener un campus por su ID
 const obtenerCampusPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus no encontrado' });
    }
    res.json(campus);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el campus' });
  }
};

// Crear un nuevo campus
 const crearCampus = async (req: Request, res: Response) => {
  try {
    const { nombre, direccion, descripcion, estado } = req.body;
    console.log(req.body); // Imprimir los datos recibidos en la consola
    if (!nombre || !direccion || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const nuevoCampus = await Campus.create({ nombre, direccion, descripcion, estado });
    res.status(201).json(nuevoCampus);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el campus' });
  }
};

// Actualizar un campus por su ID
 const actualizarCampus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, descripcion, estado } = req.body;
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus no encontrado' });
    }
    if (!nombre || !direccion || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    await campus.update({ nombre, direccion, descripcion, estado });
    res.json({ mensaje: 'Campus actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el campus' });
  }
};

// Eliminar un campus por su ID
 const eliminarCampus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ error: 'Campus no encontrado' });
    }
    await campus.destroy();
    res.json({ mensaje: 'Campus eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el campus' });
  }
};

export {
    obtenerCampus ,
    obtenerCampusPorId ,
    crearCampus,
    actualizarCampus,
    eliminarCampus
}