import { comando } from "../../comando/comando-model/comando";

export interface role {
  nombre: string,
  descripcion: string,
  estado: boolean

}

export interface roleDTO {
  Uuid: string,
  nombre: string,
  descripcion: string,
  estado: boolean

}
export interface Subsistema {
  uuid: string;
  nombre: string;
  descripcion: string;
  link: string;
  estado: boolean;
  menus: Menu[]
}

export interface Comando {
  uuid: string;
  nombre: string;
  descripcion: string;
  link: string;
  estado: boolean;
}

export interface Menu {
  uuid: string;
  nombre: string;
  descripcion: string;
  link: string;
  estado: boolean;
  comandos: Comando[];
}
export interface TreeNode {
  uuid: string;
  nombre: string;
  TreeNode?: TreeNode[];
}
export interface roles {
  nombre: string,
  nivel: number,
  estado:boolean
  descripcion: string,

}