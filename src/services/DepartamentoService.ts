import type Apartamento from '@/interfaces/Apartamento';
import Reserva from '@/interfaces/Reserva';
export default class DepartamentoService{
  private static url_db = import.meta.env.VITE_URL_DB;

  static async GETApartamento (id:number):Promise<Apartamento>{
    const promise = await fetch(`${this.url_db}/apartments?id=${id}`);
    const data = await promise.json() ;

    const reservas:Reserva[] = data[0].reservas.map((reserva:{horaInicio:string;horaFinal:string;id_apartamento:number})=> new Reserva(new Date(reserva.horaInicio),new Date(reserva.horaFinal),reserva.id_apartamento));

    const nuevoApartamento = {
      "id":data[0].id,
      "lugar":data[0].lugar,
            "precio_noche":data[0].precio_noche,
            "descripcion":data[0].descripcion,
            "URL_imagen":data[0].URL_imagen,
          "reservas":reservas} as Apartamento

    return nuevoApartamento;
  }

  static async getAll ():Promise<Apartamento[]>{
    console.log("a?")
    const promise = await fetch(`${this.url_db}/apartments`);
    const data = await promise.json() ;
    console.log(data)
    const apartamentos:Apartamento[] = []
    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      let reservas:Reserva[] = [];
      if (data[i].reservas) {
        reservas = element.reservas.map((reserva:{horaInicio:string;horaFinal:string;id_apartamento:number})=> new Reserva(new Date(reserva.horaInicio),new Date(reserva.horaFinal),reserva.id_apartamento));
      }

    const nuevoApartamento = {
      "id":element.id,
      "lugar":element.lugar,
            "precio_noche":element.precio_noche,
            "descripcion":element.descripcion,
            "URL_imagen":element.URL_imagen,
          "reservas":reservas} as Apartamento
          apartamentos.push(nuevoApartamento)
    }
    return apartamentos;
  }

  static async updateDepartment (apartamento:Apartamento) {
    await fetch(`${this.url_db}/apartments/${apartamento.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(apartamento)
  });
  }
}
