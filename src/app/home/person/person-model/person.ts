import { estadocivilDTO } from "../../estado-civil/estado-civil-model/estado-civil";
import { generoDTO } from "../../genero/genero-model/genero";
import { ocupacionDTO } from "../../ocupacion/ocupacion-model/ocupacion";

export interface person {
    nombres: string,
    primer_apellido: string,
    segundo_apellido: string,
    fecha_nacimiento: string,
    lugar_nacimiento: string,
    genero: string,
    ocupacion: string,
    estado_civil: string,
/*     genero: generoDTO,
    ocupacion: ocupacionDTO,
    estado_civil: estadocivilDTO, */
    celular: string,
}

export interface personDTO {
    uuid: string,
    nombres: string,
    primer_apellido: string,
    segundo_apellido: string,
    fecha_nacimiento: string,
    lugar_nacimiento: string,
/*     genero: generoDTO,
    ocupacion: ocupacionDTO,
    estado_civil: estadocivilDTO, */
    celular: string,
  }
  