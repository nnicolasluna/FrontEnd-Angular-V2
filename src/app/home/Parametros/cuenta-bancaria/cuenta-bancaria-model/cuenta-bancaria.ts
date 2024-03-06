export interface cuentaBancaria {
    numero_cuenta: string;
    fecha_apertura: string;
    contrato: string;
    tipoCuentasBancarias: string;
    entidadesFinancieras: string;
    monedas: string;
    agencias: string;
}
export interface cuentaBancariaDTO {
    uuid: string,
    numero_cuenta: string,
    fecha_apertura: string;
    contrato: string;
    tipoCuentasBancarias: string;
    entidadesFinancieras: string;
    monedas: string;
    agencias: string;
}
