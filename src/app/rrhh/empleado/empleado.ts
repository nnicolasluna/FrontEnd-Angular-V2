import { person } from "src/app/home/Administracion/person/person-model/person";

export interface Empleado {
    uuid: string;
    direccion: string;
    email:string;
    areas :string;
    cargos: string;
    fechaActualizacionSegip:Date ;
    actualizadoDesdeSegip: boolean;
    persona : person;
}

