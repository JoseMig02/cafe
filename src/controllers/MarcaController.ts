import { Request, Response } from 'express';
import { Marca } from '../models/Marca';

// Obtener todas las marcas
const obtenerMarcas = async (req: Request, res: Response) => {
  try {
    const marcas = await Marca.findAll();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las marcas' });
  }
};

// Obtener una marca por su ID
const obtenerMarcaPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const marca = await Marca.findByPk(id);
    if (!marca || marca == undefined  || marca == null) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la marca' });
  }
};

const createMarca = async (req: Request, res: Response) => {
    const { nombre,descripcion, estado } = req.body;
    try {
      const marca = await Marca.create({ nombre,descripcion, estado });
      res.status(201).json(marca);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear una marca' });
    }
  };

  const updateMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre,descripcion, estado } = req.body;
    try {
      const marca:any = await Marca.findByPk(id);
      if (!marca) {
        return res.status(404).json({ error: ' marca no encontrada' });
      }
      marca.nombre = nombre;
      marca.descripcion=descripcion;
      marca.estado=estado;
     
      await marca.save();
      res.json(marca);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar la marca' });
    }
  };
  
  // Eliminar un proveedor por su ID
   const deleteMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const marca:any = await Marca.findByPk(id);
      if (!marca) {
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
      await marca.destroy();
      res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
      res.status(400).json({ error: 'Error al eliminar una Marca' });
    }
  };

export { 
    obtenerMarcas, 
    obtenerMarcaPorId,
    createMarca,
    updateMarca,
    deleteMarca
};
