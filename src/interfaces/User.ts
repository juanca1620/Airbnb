import Reserva from "./Reserva";

export default interface User{
  UserName:string,
  Correo:string,
  contra:string,
  numero:string,
  cedula:string,
  listaReservas:Reserva[]

  public addReserva(reserva:Reserva){
    this.listaReservas.push(reserva)
  }

}