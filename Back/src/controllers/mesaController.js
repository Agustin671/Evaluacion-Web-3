const db = require('../models');
const { AppError } = require('../utils/errors');
const asyncHandler = require('../utils/asyncHandler');
const { parsePagination, buildPaginatedResponse } = require('../utils/pagination');
const { Op } = require('sequelize');

const { Mesa } = db;

// rq-08: Listado principal con paginación y búsqueda
const getAll = asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query);
  const { search } = req.query;

  const where = {};
  if (search) {
    // Busca mesas por su ubicación si se envía el parámetro ?search=...
    where.ubicacion = { [Op.like]: `%${search}%` };
  }

  const { count, rows } = await Mesa.findAndCountAll({
    where,
    limit,
    offset,
    order: [['numero', 'ASC']],
  });

  res.json({
    success: true,
    ...buildPaginatedResponse(rows, count, { page, limit }),
  });
});

// rq-03: Leer una sola mesa
const getById = asyncHandler(async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.id);
  if (!mesa) {
    throw new AppError('Mesa no encontrada', 404);
  }
  res.json({ success: true, data: mesa });
});

// rq-03: Crear una nueva mesa
const create = asyncHandler(async (req, res) => {
  const { numero, capacidad, ubicacion } = req.body;
  
  // Validamos que no exista otra mesa con el mismo número
  const mesaExists = await Mesa.findOne({ where: { numero } });
  if (mesaExists) {
    throw new AppError('El número de mesa ya está registrado', 409);
  }

  const mesa = await Mesa.create({ numero, capacidad, ubicacion });
  res.status(201).json({ success: true, data: mesa });
});

// rq-03: Actualizar una mesa existente
const update = asyncHandler(async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.id);
  if (!mesa) {
    throw new AppError('Mesa no encontrada', 404);
  }

  const { numero, capacidad, ubicacion } = req.body;
  
  if (numero && numero !== mesa.numero) {
    const mesaExists = await Mesa.findOne({ where: { numero } });
    if (mesaExists) {
      throw new AppError('El número de mesa ya está registrado', 409);
    }
  }

  await mesa.update({ numero, capacidad, ubicacion });
  res.json({ success: true, data: mesa });
});

// rq-03: Eliminar una mesa
const remove = asyncHandler(async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.id);
  if (!mesa) {
    throw new AppError('Mesa no encontrada', 404);
  }

  await mesa.destroy();
  res.status(204).send();
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};