import type Apartamento from "@/interfaces/Apartamento";
import type Reserva from "@/interfaces/Reserva";
import type User from "@/interfaces/User";

export default class ReservaValidator{
  static validarReserva(usuario:User,apartamento:Apartamento,reserva:Reserva):boolean{
    const reservasUser:Reserva[] = usuario.listaReservas;
    const reservasApartamento:Reserva[] = apartamento.reservas;

    let i;

    for ( i = 0;reservasApartamento[i].horaFinal <  ; ++) {

    }


  }

  static seCruzaReserva (reservaUno:Reserva,reservaDos:Reserva):boolean{
    // la primera condicion sirve para descartar fechas que nisiquiera son factibles de que se crucen
    return (reservaUno.horaFinal < reservaDos.horaInicio || reservaUno.horaInicio > reservaDos.horaFinal)  && ((reservaUno.horaInicio  <= reservaDos.horaInicio && reservaUno.horaFinal >= reservaDos.horaInicio) ||
    (reservaUno.horaInicio  <= reservaDos.horaFinal && reservaUno.horaFinal >= reservaDos.horaFinal) ||
    (reservaDos.horaInicio  <= reservaUno.horaInicio && reservaDos.horaFinal >= reservaUno.horaInicio) ||
    (reservaDos.horaInicio  <= reservaUno.horaFinal && reservaDos.horaFinal >= reservaUno.horaFinal))
  }

  static seCruzaReservaConListaReservas (listaReservas:Reserva[],reserva:Reserva){
    for (let i = 0; i < listaReservas.length; i++) {
      
    }
  }
}
