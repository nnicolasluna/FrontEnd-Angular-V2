import { menuDTO } from "../../menu/menu-model/menu";

export interface comando {
    nombre: string;
    descripcion: string;
    link: string;
    icono: string;
    estado: boolean;
    menus: menuDTO;
}
export interface comandoDTO {
    uuid: string,
    nombre: string,
    descripcion: string,
    link: string,
    icono: string,
    estado: string,
}
