import {Person} from "./person";

export interface CheckinRegistration {
    pessoa: Person,
    dataEntrada: string,
    dataSaida: string,
    adicionalVeiculo: boolean,
    valor: number

}

