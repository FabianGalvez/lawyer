var mongoose = require('mongoose');
var Proceso = mongoose.model('Proceso');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.procesosList = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.procesosCreate = function (req, res) {

  Proceso.create({
    numero: req.body.numero,
    accion: req.body.accion,
  }, function(err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, proceso);
    }
  });
};

module.exports.procesosUpdateOne = function (req, res) {
  if (!req.params.procesoid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, Se requiere ID del proceso"
    });
    return;
  }

  Proceso
    .findById(req.params.procesoid)
    .select('-actividades')
    .exec(
      function(err, proceso) {
        if (!proceso) {
          sendJsonResponse(res, 404, {
            "message": "Id de proceso no registrado"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        proceso.numero  = req.body.numero;
        proceso.accion = req.body.accion;
        proceso.actores = req.body.actores.split(",");
        proceso.demandados = req.body.demandados.split(",");

        proceso.save(function(err, proceso) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, proceso);
          }
        });
      }
    );
};


module.exports.procesosDeleteOne = function (req, res) {
  var procesoid = req.params.procesoid;
  if (procesoid) {
    Proceso
    .findByIdAndRemove(procesoid)
    .exec(
      function(err, proceso) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "No hay ID de proceso"
    });
  }
};

module.exports.procesosReadOne = function(req, res) {
  if (req.params && req.params.procesoid) {
    Proceso
      .findById(req.params.procesoid)
      .exec(function(err, proceso) {
        if (!proceso) {
          sendJsonResponse(res, 404, {
            "message": "Proceso no registrado"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, proceso);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "Se requiere ID del proceso"
    });
  }
};
