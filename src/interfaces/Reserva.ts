

export default class Reserva{
  horaInicio:Date;
  horaFinal:Date;

  constructor (horaInicio:Date,horaFinal:Date){
    if (horaInicio < horaFinal) {
      this.horaInicio = horaInicio;
      this.horaFinal = horaFinal;
    }else{
      throw new Error("Error,the hours are crosed")
    }
  }



}
