

export default class Reserva{
  horaInicio:{annio:number,
    mes:number,
    dia:number
  }
  horaFinal:{annio:number,
    mes:number,
    dia:number
  }

  constructor (horaInicio:{annio:number,
    mes:number,
    dia:number
  },horaFinal:{annio:number,
    mes:number,
    dia:number
  }){
    this.horaInicio = horaInicio;
    this.horaFinal = horaFinal;
  }

  static isValidReserva(reserva:Reserva):boolean {
    return new Date(reserva.horaInicio.annio,reserva.horaInicio.mes - 1,reserva.horaInicio.dia) < new Date(reserva.horaFinal.annio,reserva.horaFinal.mes,reserva.horaFinal.dia)
  }

  static canGet
}
