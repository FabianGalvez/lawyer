var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');
var ctrlProcesos = require('../controllers/procesos');
var ctrlActividades = require('../controllers/actividades');

//Acceso de Usuarios
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// procesos
router.get('/procesos', ctrlProcesos.procesosList);
router.post('/procesos', ctrlProcesos.procesosCreate);
router.put('/procesos/:procesoid', ctrlProcesos.procesosUpdateOne);
router.get('/procesos/:procesoid', ctrlProcesos.procesosReadOne);
router.delete('/procesos/:procesoid', ctrlProcesos.procesosDeleteOne);

// Actividades
router.post('/procesos/:procesoid/actividades', ctrlActividades.actividadesCreate);
router.get('/procesos/:procesoid/actividades/:reviewid',ctrlActividades.actividadesReadOne);
router.put('/procesos/:procesoid/actividades/:reviewid',ctrlActividades.actividadesUpdateOne);
router.delete('/procesos/:procesoid/actividades/:reviewid',ctrlActividades.actividadesDeleteOne);

module.exports = router;
