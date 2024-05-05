import { Articulo } from '../models/Articulo';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Método para crear un nuevo artículo
const crearArticulo = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, marcaID, precio, proveedorID, existencia, estado } = req.body;
    if (!nombre || !marcaID || !precio || !proveedorID || !existencia || !estado) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear el nuevo artículo en la base de datos
    const nuevoArticulo = await Articulo.create({ nombre, descripcion, marcaID, precio, proveedorID, existencia, estado });
    res.status(201).json(nuevoArticulo);
  } catch (error) {
    console.error('Error al crear el artículo:', error);
    res.status(500).json({ error: 'Error al crear el artículo' });
  }
};

// Método para obtener todos los artículos
const obtenerArticulos = async (req: Request, res: Response) => {
  try {
    const articulos = await Articulo.findAll();
    res.json(articulos);
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
};

// Método para obtener un artículo por su ID
const obtenerArticuloPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const articulo = await Articulo.findByPk(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    res.json(articulo);
  } catch (error) {
    console.error('Error al obtener el artículo:', error);
    res.status(500).json({ error: 'Error al obtener el artículo' });
  }
};

// Método para actualizar un artículo por su ID
const actualizarArticulo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const articulo:any = await Articulo.findByPk(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Actualizar los campos del artículo si se proporcionan en el cuerpo de la solicitud
    const { nombre, descripcion, marcaID, precio, proveedorID, existencia, estado } = req.body;
    if (nombre) articulo.nombre = nombre;
    if (descripcion) articulo.descripcion = descripcion;
    if (marcaID) articulo.marcaID = marcaID;
    if (precio) articulo.precio = precio;
    if (proveedorID) articulo.proveedorID = proveedorID;
    if (existencia) articulo.existencia = existencia;
    if (estado) articulo.estado = estado;

    // Guardar los cambios en la base de datos
    await articulo.save();
    res.json(articulo);
  } catch (error) {
    console.error('Error al actualizar el artículo:', error);
    res.status(500).json({ error: 'Error al actualizar el artículo' });
  }
};

// Método para eliminar un artículo por su ID
const eliminarArticulo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const numFilasEliminadas = await Articulo.destroy({ where: { id } });
    if (numFilasEliminadas === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    res.json({ mensaje: 'Artículo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el artículo:', error);
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
};

// Método para subir una imagen del artículo
const subirImagenArticulo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Verificar si el empleado existe
      const articulo:any = await Articulo.findByPk(id);
      if (!articulo) {
        return res.status(404).json({ error: 'Articulo no encontrado' });
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
     articulo.img = nombreArchivo;
      await articulo.save();
  
      res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
    } catch (error) {
      console.error('Error al subir la imagen del del articulo:', error);
      res.status(500).json({ error: 'Error al subir la imagen del articulo' });
    }
  };
  
  const obtenerImagenArticulo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const articulo:any = await Articulo.findByPk(id);
      if (!articulo) {
        return res.status(404).json({ error: 'Articulo no encontrada' });
      }
      if (!articulo.img) {
        return res.status(404).json({ error: 'El articulo no tiene una imagen asociada' });
      }
      const rutaImagen = path.join(__dirname, '../../src/uploads', articulo.img);
      res.sendFile(rutaImagen);
    } catch (error) {
      console.error('Error al obtener la imagen del articulo:', error);
      res.status(500).json({ error: 'Error al obtener la imagen del articulo' });
    }
  };
// Exportar los métodos CRUD de Articulo
export { 
    crearArticulo, 
    obtenerArticulos,
     obtenerArticuloPorId, 
     actualizarArticulo, 
     eliminarArticulo, 
     subirImagenArticulo ,
     obtenerImagenArticulo};
