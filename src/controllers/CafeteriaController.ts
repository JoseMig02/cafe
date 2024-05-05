// cafeteria.controller.ts
import { Request, Response } from 'express';
import { Cafeteria } from '../models/Cafeteria';
import fs from 'fs';
import path from 'path';

// Obtener todas las cafeterías
const obtenerCafeterias = async (req: Request, res: Response) => {
  try {
    const cafeterias = await Cafeteria.findAll();
    res.json(cafeterias);
  } catch (error) {
    console.error('Error al obtener las cafeterías:', error);
    res.status(500).json({ error: 'Error al obtener las cafeterías' });
  }
};

// Crear una nueva cafetería
const crearCafeteria = async (req: Request, res: Response) => {
  try {
    const { descripcion, campusID, encargado, estado, nombre, direccion, telefono } = req.body;
    if (!descripcion || !campusID || !encargado || !estado || !nombre || !direccion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const nuevaCafeteria = await Cafeteria.create({
      descripcion,
      campusID,
      encargado,
      estado,
      nombre,
      direccion,
      telefono,
      
    });
    res.status(201).json(nuevaCafeteria);
  } catch (error) {
    console.error('Error al crear la cafetería:', error);
    res.status(500).json({ error: 'Error al crear la cafetería' });
  }
};

// Obtener una cafetería por su ID
const obtenerCafeteriaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cafeteria = await Cafeteria.findByPk(id);
    if (!cafeteria) {
      return res.status(404).json({ error: 'Cafetería no encontrada' });
    }
    res.json(cafeteria);
  } catch (error) {
    console.error('Error al obtener la cafetería:', error);
    res.status(500).json({ error: 'Error al obtener la cafetería' });
  }
};

// Actualizar una cafetería por su ID
const actualizarCafeteria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descripcion, campusID, encargado, estado, nombre, direccion, telefono } = req.body;
    const cafeteria = await Cafeteria.findByPk(id);
    if (!cafeteria) {
      return res.status(404).json({ error: 'Cafetería no encontrada' });
    }
    await cafeteria.update({ descripcion, campusID, encargado, estado, nombre, direccion, telefono, });
    res.json({ mensaje: 'Cafetería actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la cafetería:', error);
    res.status(500).json({ error: 'Error al actualizar la cafetería' });
  }
};

// Eliminar una cafetería por su ID
const eliminarCafeteria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numFilasEliminadas = await Cafeteria.destroy({ where: { id } });
    if (numFilasEliminadas === 0) {
      return res.status(404).json({ error: 'Cafetería no encontrada' });
    }
    res.json({ mensaje: 'Cafetería eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la cafetería:', error);
    res.status(500).json({ error: 'Error al eliminar la cafetería' });
  }
};


// Subir imagen de cafetería
const subirImagenCafeteria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cafeteria:any = await Cafeteria.findByPk(id);
    if (!cafeteria) {
      return res.status(404).json({ error: 'Cafetería no encontrada' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }
    
    const imagen = req.file;

      // Validar la extensión del archivo
      const extension = path.extname(imagen.originalname).toLowerCase();
      if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
        fs.unlinkSync(imagen.path); // Eliminar archivo no válido
        return res.status(400).json({ error: 'La imagen debe ser de tipo PNG o JPG' });
      }
    // Guardar la imagen en el servidor
    const nombreArchivo = `${Date.now()}-${imagen.originalname}`;
    const rutaArchivo = path.join(__dirname, '../../src/uploads', nombreArchivo);
    fs.renameSync(imagen.path, rutaArchivo);
    // Actualizar la ruta de la imagen en la base de datos
    cafeteria.img = nombreArchivo;
    await cafeteria.save();
    res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
  } catch (error) {
    console.error('Error al subir la imagen de la cafetería:', error);
    res.status(500).json({ error: 'Error al subir la imagen de la cafetería' });
  }
};

// Obtener imagen de cafetería por su ID
const obtenerImagenCafeteria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cafeteria:any = await Cafeteria.findByPk(id);
    if (!cafeteria) {
      return res.status(404).json({ error: 'Cafetería no encontrada' });
    }
    if (!cafeteria.img) {
      return res.status(404).json({ error: 'La cafetería no tiene una imagen asociada' });
    }
    const rutaImagen = path.join(__dirname, '../../src/uploads', cafeteria.img);
    res.sendFile(rutaImagen);
  } catch (error) {
    console.error('Error al obtener la imagen de la cafetería:', error);
    res.status(500).json({ error: 'Error al obtener la imagen de la cafetería' });
  }
};

// Demás funciones CRUD...




export { obtenerCafeterias, crearCafeteria, obtenerCafeteriaPorId, actualizarCafeteria, eliminarCafeteria,subirImagenCafeteria, obtenerImagenCafeteria };
