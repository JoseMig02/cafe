// empleado.controller.ts

import { Request, Response } from 'express';
import { Empleado } from '../models/Empleado'
import fs from 'fs';
import path from 'path';
import pdf from 'pdfkit';





// Obtener todos los empleados
const obtenerEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

// Crear un nuevo empleado
const crearEmpleado = async (req: Request, res: Response) => {
  const { nombre, cedula, tandaLabor, cargo, porcientoComision, fechaIngreso, estado } = req.body;
  try {
    const empleado = await Empleado.create({
      nombre,
      cedula,
      tandaLabor,
      cargo,
      porcientoComision,
      fechaIngreso,
      estado
    });
    res.json(empleado);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el empleado' });
  }
};

// Obtener un empleado por su ID
const obtenerEmpleadoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Actualizar un empleado por su ID
const actualizarEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, cedula, tandaLabor, cargo, porcientoComision, fechaIngreso, estado } = req.body;
  try {
    const empleado:any= await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    empleado.nombre = nombre;
    empleado.cedula = cedula;
    empleado.tandaLabor = tandaLabor;
    empleado.cargo = cargo;
    empleado.porcientoComision = porcientoComision;
    empleado.fechaIngreso = fechaIngreso;
    empleado.estado = estado;
    await empleado.save();
    res.json(empleado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el empleado' });
  }
};

// Eliminar un empleado por su ID
const eliminarEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    await empleado.destroy();
    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};
    

const exportarEmpleadosPDF = async (req: Request, res: Response) => {
  try {
      const empleados: any = await Empleado.findAll();
      const fileName = 'empleados.pdf';
      const folderPath = path.join(__dirname, '../../src/ReportesEmpleados');

      // Crear el directorio si no existe
      if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
      }

      const filePath = path.join(folderPath, fileName);

      const pdfDoc = new pdf();
      pdfDoc.pipe(fs.createWriteStream(filePath));

      pdfDoc.fontSize(16).text('Lista de Empleados', { align: 'center' }).moveDown();

      empleados.forEach((empleado: any, index: number) => {
          pdfDoc.fontSize(12).text(`${index + 1}. Nombre: ${empleado.nombre}, Cédula: ${empleado.cedula}, Cargo: ${empleado.cargo},Tanda laborable: ${empleado.tandaLabor}, Comicion: ${empleado.porcientoComision}, Estado: ${empleado.estado}`);
      });

      pdfDoc.end();

      // Enviar el archivo PDF como parte de la respuesta HTTP
      res.status(200).download(filePath, fileName);
  } catch (error) {
      res.status(500).json({ error: 'Error al exportar empleados a PDF' });
  }
};



const subirImagenEmpleado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar si el empleado existe
    const empleado:any = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Verificar si se proporcionó una imagen
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
    const nombreArchivo = `${Date.now()}${extension}`;
    const rutaArchivo = path.join(__dirname, '../../src/uploads', nombreArchivo);

    fs.renameSync(imagen.path, rutaArchivo);

    // Actualizar el campo imagen del empleado en la base de datos
    empleado.imagen = nombreArchivo;
    await empleado.save();

    res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
  } catch (error) {
    console.error('Error al subir la imagen del empleado:', error);
    res.status(500).json({ error: 'Error al subir la imagen del empleado' });
  }
};

const obtenerImagenEmpleado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const empleado:any = await Empleado.findByPk(id);
    if (! empleado) {
      return res.status(404).json({ error: 'Empleado no encontrada' });
    }
    if (! empleado.imagen) {
      return res.status(404).json({ error: 'El empleado no tiene una imagen asociada' });
    }
    const rutaImagen = path.join(__dirname, '../../src/uploads',  empleado.imagen);
    res.sendFile(rutaImagen);
  } catch (error) {
    console.error('Error al obtener la imagen del empleado:', error);
    res.status(500).json({ error: 'Error al obtener la imagen del empleado' });
  }
};


export {
    obtenerEmpleados,
    crearEmpleado, 
    obtenerEmpleadoPorId,
    actualizarEmpleado, 
    eliminarEmpleado,
    exportarEmpleadosPDF,
    subirImagenEmpleado,
    obtenerImagenEmpleado
    
     };
