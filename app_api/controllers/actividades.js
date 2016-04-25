var mongoose = require('mongoose');
var Proceso = mongoose.model('Proceso');
var Actividad = mongoose.model('Actividad');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var doAddActividad = function(req, res, proceso) {
  if (!proceso) {
    sendJsonResponse(res, 404, {
      "message": "Proceso no encontrado"
    });
  } else {
    proceso.actividades.push({
      descripcion: req.body.descripcion,
      emitidaOn: req.body.emitidaOn,
      venceOn: req.body.venceOn
    });

    proceso.save(function(err, proceso) {
      var thisActividad;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        thisActividad = proceso.actividades[proceso.actividades.length - 1];
        sendJsonResponse(res, 201, thisActividad);
      }
    });
  }
};

module.exports.actividadesCreate = function (req, res) {
  var procesoid = req.params.procesoid;
  if (procesoid) {
    Proceso
      .findById(procesoid)
      .select('actividades')
      .exec(
        function(err, proceso) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddActividad(req, res, proceso);
          }
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, Se requiere ID del proceso"
    });
  }
};

module.exports.actividadesReadOne = function (req, res) {
  if (req.params && req.params.pricesoid && req.params.actividadid) {
  Proceso
    .findById(req.params.procesoid)
    .select ("numero actividades")
    .exec(
      function(err, proceso) {
        var response, actividad;
        if (!proceso) {
          sendJsonResponse(res, 404, {"message": "Proceso no registrado"});
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        if (proceso.actividades && proceso.actividades.length > 0) {
          actividad = proceso.actividades.id(req.params.actividadid);
          if (!actividad) {
            sendJsonResponse(res, 404, {"message": "Actividad no encontrada"});
          } else {
            response = {
              proceso : {
                numero : proceso.numero,
                id : req.params.procesoid
              },
              actividad : actividad
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {"message": "No se han encontrado actividades registradas"});
        }
      }
    );
  } else {
      sendJsonResponse(res, 404, {"message": "No existe, Se requiere Id de Proceso con Id de Actividad"});
  }
};

module.exports.actividadesUpdateOne = function (req, res) {

  if (!req.params.procesoid || !req.params.actividadid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, Se requiere Id de proceso mas Id de Actividad"
    });
    return;
  }

  Proceso
  .findById(req.params.procesoid)
  .select('actividades')
  .exec(
    function(err, proceso) {
      var thisActividad;
      if (!Proceso) {
          sendJsonResponse(res, 404, {"message": "Proceso no registrado"});        
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }

      if (proceso.actividades && proceso.actividades.length > 0) {
        thisActividad = proceso.actividades.id(req.params.actividadid);
        if (!thisActividad) {
          sendJsonResponse(res, 404, {
            "message": "Actividad no registrada"
          });
        } else {
          thisActividad.descripcion = req.body.descripcion;
          thisActividad.emitidaOn = req.body.emitidaOn;
          thisActividad.venceOn = req.body.venceOn;
          proceso.save(function(err, proceso) {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
              sendJsonResponse(res, 200, thisActividad);
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, {
          "message": "No existe actividad para actualizar"
        });
      }
    }
  );
};

module.exports.actividadesDeleteOne = function (req, res) {
  if (!req.params.procesoid || !req.params.actividadid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, Se requiere Id de proceso mas Id de Actividad"
    });
    return;
  }

  Proceso
    .findById(req.params.procesoid)
    .select('actividades')
    .exec(
      function(err, proceso) {
        if (!proceso) {
          sendJsonResponse(res, 404, {"message": "Proceso no registrado"});
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        if (proceso.actividades && proceso.actividades.length > 0) {
          if (!proceso.actividades.id(req.params.actividadid)) {
            sendJsonResponse(res, 404, {
              "message": "Actividad no registrada"
            });
          } else {
            proceso.actividades.id(req.params.actividadid).remove();
            proceso.save(function(err) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No existen atividades para borrar"
          });
        }
      }
    );
};
