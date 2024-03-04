export interface user {
    usuario: string,
    password: string,
    correoCorporativo: string,
    correoPersonal: string,
    estado: boolean,
    personaUuid:string,
    /* role: [] */
}

export interface userDTO {
    Uuid: string,
    usuario: string,
    password: string,
    correoCorporativo: string,
    correoPersonal: string,
    estado: boolean
   
}