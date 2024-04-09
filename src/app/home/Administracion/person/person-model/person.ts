
export interface person {
    uuid: string,
    nombres: string,
    primer_apellido: string,
    segundo_apellido: string,
    fecha_nacimiento: string,
    lugar_nacimiento: string,
    generos: string,
    ocupaciones: string,
    estadosCiviles: string,
    celular: string,
}

export interface personDTO {
    uuid: string,
    nombres: string,
    primer_apellido: string,
    segundo_apellido: string,
    fecha_nacimiento: string,
    lugar_nacimiento: string,
    genero: string,
    ocupacion: string,
    estado_civil: string,
    celular: string,
}
