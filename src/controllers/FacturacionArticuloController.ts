import { Request, Response } from 'express';
import { FacturacionArticulos } from '../models/FacturacionArticulo';
import { Articulo } from '../models/Articulo';
import { Op } from 'sequelize';
import { Usuario } from '../models/Usuario';
import { Cafeteria } from '../models/Cafeteria';
import { Campus } from '../models/Campus';
import { Empleado } from '../models/Empleado';

// Obtener todas las facturas de artículos
const getAllFacturacionArticulos = async (req: Request, res: Response) => {
    try {
        const facturas = await FacturacionArticulos.findAll();
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Obtener una factura de artículo por su ID
const getFacturacionArticuloById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const factura = await FacturacionArticulos.findByPk(id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura de artículo no encontrada' });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Crear una nueva factura de artículo
const createFacturacionArticulo = async (req: Request, res: Response) => {
    const { empleadoID, articuloID, usuarioID, campusID, cafeteriaID, fechaVenta, unidadesVendidas, comentario, estado } = req.body;

    // Validar la presencia de campos obligatorios
    if (!empleadoID || !articuloID || !usuarioID || !campusID || !cafeteriaID || !fechaVenta || !unidadesVendidas || !comentario || !estado) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        // Obtener el precio del artículo
        const articulo:any = await Articulo.findByPk(articuloID);
        if (!articulo) {
            return res.status(404).json({ error: 'El artículo no existe' });
        }
        const usuario:any = await Usuario.findByPk(usuarioID )
        if(!usuario){
            return res.status(404).json({error:'El usuario no existe'});
        }
        const cafeteria:any= await Cafeteria.findByPk(cafeteriaID);
        if(!cafeteria){
            return res.status(404).json({error:'La cafeteria no existe'})
        }
        const campus:any= Campus.findByPk(campusID);
        if(!campus){
            return res.status(404).json({error:'Campus no encontrado'})
        }

        const empleado:any= Empleado.findByPk(empleadoID);
        if(!empleado){
            return res.status(404).json({error:'Empleado no encontrado'})
        }
        // Calcular el monto del artículo y el total
        const montoArticulo = articulo.precio;
        const Total = montoArticulo * unidadesVendidas;

        // Crear la factura con los datos proporcionados
        const facturaCreada = await FacturacionArticulos.create({
            empleadoID,
            articuloID,
            usuarioID,
            campusID,
            cafeteriaID,
            fechaVenta,
            montoArticulo,
            unidadesVendidas,
            Total, // Agregar el total calculado
            comentario,
            estado
        });

        res.status(201).json(facturaCreada);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Actualizar una factura de artículo por su ID
const updateFacturacionArticuloById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { empleadoID, articuloID, usuarioID, campusID, cafeteriaID, fechaVenta, unidadesVendidas, comentario, estado } = req.body;

    // Validar la presencia de campos obligatorios
    if (!empleadoID || !articuloID || !usuarioID || !campusID || !cafeteriaID || !fechaVenta || !unidadesVendidas || !comentario || !estado) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        // Verificar si la factura de artículo existe
        const facturaExistente = await FacturacionArticulos.findByPk(id);
        if (!facturaExistente) {
            return res.status(404).json({ message: 'Factura de artículo no encontrada' });
        }

        // Obtener el precio del artículo
        const articulo:any = await Articulo.findByPk(articuloID);
        if (!articulo) {
            return res.status(404).json({ error: 'El artículo no existe' });
        }

        // Calcular el monto del artículo y el total
        const montoArticulo = articulo.precio;
        const Total = montoArticulo * unidadesVendidas;

        // Actualizar la factura con los datos proporcionados
        await facturaExistente.update({
            empleadoID,
            articuloID,
            usuarioID,
            campusID,
            cafeteriaID,
            fechaVenta,
            montoArticulo,
            unidadesVendidas,
            Total, // Actualizar el total calculado
            comentario,
            estado
        });

        res.json({ message: 'Factura de artículo actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


// Eliminar una factura de artículo por su ID
const deleteFacturacionArticuloById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resultado = await FacturacionArticulos.destroy({
            where: { noFactura: id }
        });
        if (!resultado) {
            return res.status(404).json({ message: 'Factura de artículo no encontrada' });
        }
        res.json({ message: 'Factura de artículo eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Consulta de ventas por usuario
const getVentasPorUsuario = async (req: Request, res: Response) => {
    const { usuarioID } = req.params;
    try {
        const ventas = await FacturacionArticulos.findAll({
            where: { usuarioID }
        });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Consulta de ventas por fecha
const getVentasPorFecha = async (req: Request, res: Response) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const ventas = await FacturacionArticulos.findAll({
            where: {
                fechaVenta: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            }
        });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Consulta de ventas por campus
const getVentasPorCampus = async (req: Request, res: Response) => {
    const { campusID } = req.params;
    try {
        const ventas = await FacturacionArticulos.findAll({
            where: { campusID }
        });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Reporte de rentas entre fechas y por campus
const generarReporteDeRentas = async (req: Request, res: Response) => {
    const { fechaInicio, fechaFin, campusID } = req.query;
    try {
        const rentas = await FacturacionArticulos.findAll({
            where: {
                fechaVenta: {
                    [Op.between]: [fechaInicio, fechaFin]
                },
                campusID
            }
        });
        res.json(rentas);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export {
    getAllFacturacionArticulos,
    getFacturacionArticuloById,
    createFacturacionArticulo,
    updateFacturacionArticuloById,
    deleteFacturacionArticuloById,
    getVentasPorUsuario,
    getVentasPorFecha,
    getVentasPorCampus,
    generarReporteDeRentas
};
