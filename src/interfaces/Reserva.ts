

export default class Reserva{
  horaInicio:Date;
  horaFinal:Date;

  constructor (horaInicio:Date,horaFinal:Date){
    this.horaInicio = horaInicio;
    this.horaFinal = horaFinal;
  }

  isValidReserva(reserva:Reserva):boolean {
    return reserva.horaInicio < reserva.horaFinal;
  }

}
