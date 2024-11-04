import type Apartamento from '@/interfaces/Apartamento';
import type Reserva from '@/interfaces/Reserva';
import type User from '@/interfaces/User';

export default class DepartamentoService{
  private static url_db = process.env.VUE_APP_URL_DB;

  static async GETApartamento (id:number):Promise<Apartamento>{
    const promise = await fetch(`${this.url_db}/apartments?id=${id}`);
    const data = await promise.json() ;

    const reservas:Reserva[] = data.reservas

    return data;
  }
}