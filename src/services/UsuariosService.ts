import Reserva from '@/interfaces/Reserva';
import type User from '@/interfaces/User';

export default class UsuarioService{
  private static url_db = import.meta.env.VITE_URL_DB;

  static async GETuser (userName:string):Promise<User>{
    const promise = await fetch(`${this.url_db}/users?UserName=${userName}`);
    const data = await promise.json();

    console.log(data)

    let reservas:Reserva[] = []

    if(data[0].listaReservas != undefined){
      console.log("Legue")
      reservas = data[0].listaReservas.map((reserva:{horaInicio:string;horaFinal:string;id_apartamento:number})=> new Reserva(new Date(reserva.horaInicio),new Date(reserva.horaFinal),reserva.id_apartamento));
    }


    const nuevoUsuario = {
      id:data[0].id,
      UserName:data[0].UserName,
      Correo:data[0].Correo,
      contra:data[0].contra,
      numero:data[0].numero,
      cedula:data[0].cedula,
      listaReservas:reservas} as User
      console.log(nuevoUsuario)
    return nuevoUsuario ;
  }

  static async updateUser (usuario:User) {
    if (!usuario.id) {
      console.error('El ID del usuario no está definido');
      return;
    }

    await fetch(`${this.url_db}/users/${usuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });
  }

}
