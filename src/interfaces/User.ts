export default interface User{
  UserName:string,
  Correo:string,
  contra:string,
  numero:string,
  cedula:string,
  listaReservas:{annio:number,
    mes:number,
    dia:number
  }[]
}
