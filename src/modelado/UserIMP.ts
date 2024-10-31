import type User from '@/interfaces/User'

export default class UserIMP implements User {
  UserName: string
  Correo: string
  contra: string
  numero: string
  cedula: string
  listaReservas: { annio: number; mes: number; dia: number }[]

  listaReservasData: Date[]

  constructor(user: User) {
    this.listaReservas = user.listaReservas
    this.UserName = user.UserName
    this.Correo = user.Correo
    this.contra = user.contra
    this.numero = user.numero
    this.cedula = user.cedula
    this.listaReservasData = []
    for (let i = 0; i < user.listaReservas.length; i++) {
      const element = user.listaReservas[i]
      const date: Date = new Date(element.annio, element.mes - 1, element.dia)
      this.listaReservasData.push(date)
    }
  }

  userToJSON(): string {
    let cadenaReservas: string = '['

    for (let i = 0; i < this.listaReservas.length; i++) {
      const element = this.listaReservas[i]
      cadenaReservas =
        cadenaReservas +
        `{"annio":${element.annio},"mes":${element.mes},"dia":${element.dia}}`
      if (i < this.listaReservas.length - 1) {
        cadenaReservas = cadenaReservas + ','
      }
    }
    cadenaReservas = cadenaReservas + '\n]'
    return `
      {"UserName":"${this.UserName}",
  "Correo":"${this.Correo}",
  "contra":"${this.contra}",
  "numero":"${this.numero}",
  "cedula":"${this.cedula}",
  listaReservas:${cadenaReservas}}
    `
  }
}
