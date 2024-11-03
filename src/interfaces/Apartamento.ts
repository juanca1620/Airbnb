import Reserva from "./Reserva";

export default interface Apartamento {
  lugar: string;
  precio_noche: number;
  descripcion: string;
  URL_imagen: string;
  reservas: Reserva[];
}
