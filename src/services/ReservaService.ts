import type Apartamento from "@/interfaces/Apartamento";
import type Reserva from "@/interfaces/Reserva";
import type User from "@/interfaces/User";
import ReservaValidator from "@/validator/ReservaValidator";
import UsuarioService from "./UsuariosService";
import DepartamentoService from "./DepartamentoService";

export default class ReservaService{

  static addReserva (usuario:User,apartamento:Apartamento,reserva:Reserva):boolean{
    if(ReservaValidator.validarReserva(usuario,apartamento,reserva)){
      usuario.listaReservas.push(reserva);
      apartamento.reservas.push(reserva);
      console.log(apartamento.lugar)
      console.log(usuario.listaReservas)
      console.log(apartamento.reservas)
      UsuarioService.updateUser(usuario);
      DepartamentoService.updateDepartment(apartamento);
      return true;
    }
    return false;
  }
}
