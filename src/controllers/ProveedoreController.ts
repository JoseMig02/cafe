// proveedor.controller.ts

import { Request, Response } from 'express';
import { Proveedores } from '../models/Proovedor';

// Obtener todos los proveedores
const getAllProveedores = async (req: Request, res: Response) => {
  try {
    const proveedores = await Proveedores.findAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

// Crear un nuevo proveedor
 const createProveedor = async (req: Request, res: Response) => {
  const { nombreComercial, rnc, fechaRegistro, estado } = req.body;
  try {
    const proveedor = await Proveedores.create({ nombreComercial, rnc, fechaRegistro, estado });
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el proveedor' });
  }
};

 const getTipoUsuarioById = async (req:Request,res:Response) => {
    const { id } = req.params;
    try {
      const  proveedor = await Proveedores.findByPk(id);
      if (!proveedor) {
        return res.status(404).json({ error: ' Proveedor no encontrado' });
      }
      res.json( proveedor);
    } catch (error) {
      res.status(500).json({ error});
    }
  };
  
// Actualizar un proveedor por su ID
const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombreComercial, rnc, fechaRegistro, estado } = req.body;
  try {
    const proveedor:any = await Proveedores.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    proveedor.nombreComercial = nombreComercial;
    proveedor.rnc = rnc;
    proveedor.fechaRegistro = fechaRegistro;
    proveedor.estado = estado;
    await proveedor.save();
    res.json(proveedor);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el proveedor' });
  }
};

// Eliminar un proveedor por su ID
 const deleteProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedores.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    await proveedor.destroy();
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el proveedor' });
  }
};


export {
    getAllProveedores,
    createProveedor,
    getTipoUsuarioById,
    updateProveedor,
    deleteProveedor

}