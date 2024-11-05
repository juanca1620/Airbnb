export default class Reserva{
  horaInicio:Date;
  horaFinal:Date;
  id_apartamento:number;

  constructor (horaInicio:Date,horaFinal:Date,id_apartamento:number){
    if (horaInicio < horaFinal) {
      this.horaInicio = horaInicio;
      this.horaFinal = horaFinal;
      this.id_apartamento = id_apartamento;
    }else{
      throw new Error("Error,the hours are crosed")
    }
  }
}

