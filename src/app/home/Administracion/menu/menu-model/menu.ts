import { subsistema, subsistemaDTO } from "../../subsistema/subsistema-model/subsistema";

export interface menu {
    nombre: string;
    descripcion: string;
    link: string;
    icono: string;
    estado: boolean;
    subsistemas: subsistemaDTO;

}


export interface menuDTO {
    uuid: string,
    nombre: string,
    descripcion: string,
    link: string,
    icono: string,
    estado: string,
}
