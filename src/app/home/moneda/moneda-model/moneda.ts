import { pais } from "../../pais/pais-model/pais";

export interface moneda {
    nombre: string
    abreviatura: string
    descripcion: string
    pais:pais
  
}
export interface monedaDTO {
    uuid: string,
    nombre: string,
    abreviatura: string;
    descripcion: string
    pais:pais
}
