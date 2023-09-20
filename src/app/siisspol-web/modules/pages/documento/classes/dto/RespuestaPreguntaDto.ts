export class RespuestaPreguntaDto {
  idDenunciaRespuesta: string | undefined;
  pregunta: string | undefined;
  idDenuncia: string | undefined;
  respuesta: string;


  constructor(idDenunciaRespuesta: string | undefined, pregunta: string | undefined, idDenuncia: string | undefined, respuesta: string ) {
    this.idDenunciaRespuesta = idDenunciaRespuesta;
    this.pregunta = pregunta;
    this.idDenuncia = idDenuncia;
    this.respuesta = respuesta;
  }
}
