import { personDTO } from "../../person/person-model/person";

export interface documento {
    numero: string;
    lugar_emision: string;
    estado: boolean;
    personas: string,
    tipo_documentoUuid:string
    
}
export interface documentoDTO {

    numero: string,
    lugar_emision: string,
    estado: boolean,
    personas: string,
    tipo_documentoUuid:string
}
