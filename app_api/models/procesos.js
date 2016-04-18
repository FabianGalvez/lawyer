var mongoose = require( 'mongoose' );

var actividadSchema = new mongoose.Schema({
  descripcion: {type: String, required: true},
  emitidaOn: {type: Date},
  venceOn: {type: Date},
  createdOn: {type: Date, default: Date.now},
})

var actorSchema =  new mongoose.Schema({
  cedulaActor: {type: String, required: true},
  apellidosActor: {type: String, required: true},
  nombresActor: {type: String, required: true}
});

var demandadoSchema =  new mongoose.Schema({
  cedulaActor: {type: String, required: true},
  apellidosActor: {type: String, required: true},
  nombresActor: {type: String, required: true}
});

var procesoSchema = new mongoose.Schema({
  numero: {type: String,required: true },
  accion: {type: String, required: true },
  actores: [actorSchema],
  demandados: [demandadoSchema],
  actividades: [actividadSchema],
  createdOn: {type: Date, default: Date.now},
});

mongoose.model('Proceso', procesoSchema);
mongoose.model('Actividad', actividadSchema);
