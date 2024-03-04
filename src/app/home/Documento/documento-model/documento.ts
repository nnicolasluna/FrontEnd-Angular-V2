import { personDTO } from "../../person/person-model/person";

export interface documento {
    numero: string;
    lugar_emision: string;
    estado: boolean;
    personas: personDTO,
    tipo_documentoUuid:string
    
}
export interface documentoDTO {
    uuid: string,
    numero: string,
    lugar_emision: string,
    estado: boolean,
}
