import type Apartamento from "@/interfaces/Apartamento";
import type Reserva from "@/interfaces/Reserva";
import type User from "@/interfaces/User";

export default class ReservaValidator{
  static validarReserva(usuario:User,apartamento:Apartamento,reserva:Reserva):boolean{
    const reservasUser:Reserva[] = usuario.listaReservas;
    const reservasApartamento:Reserva[] = apartamento.reservas;

    return !(this.seCruzaReservaConListaReservas(reservasUser,reserva) && this.seCruzaReservaConListaReservas(reservasApartamento,reserva))
  }

  static noSeCruzaReserva (reservaUno:Reserva,reservaDos:Reserva):boolean{
    return reservaUno.horaFinal < reservaDos.horaInicio || reservaUno.horaInicio > reservaDos.horaFinal
  }

  static seCruzaReservaConListaReservas (listaReservas:Reserva[],reserva:Reserva){
    for (let i = 0; i < listaReservas.length; i++) {
      if (!this.noSeCruzaReserva(reserva,listaReservas[i])) {
        return true;
      }
    }
    return false;
  }
}
