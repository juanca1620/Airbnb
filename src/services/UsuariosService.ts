import type User from '@/interfaces/User';

export default class UsuarioService{
  private static url_db = process.env.VUE_APP_URL_DB;

  static async GETuser (userName:string):Promise<User>{
    const promise = await fetch(`${this.url_db}/users?UserName=${userName}`);
    const data = await promise.json();

    return data;
  }
}
