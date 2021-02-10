import { InjectionToken } from '@angular/core';
import { DescricaoSistema } from './descricao-sistema';
export declare const ENVIRONMENT_TOKEN: InjectionToken<ConfiguracaoEnvironment>;
export interface KzEnvironment {
    contexto: string;
}
export interface ModulosEnvironment {
    administracao?: string;
    centralMandados?: string;
    sif?: string;
    sao?: string;
}
export interface SistemaEnvironment {
    descricao: DescricaoSistema;
}
export interface LegadoEnvironment {
    contextoDesenvolvimento?: string;
    contextoPrimeiroGrau: string;
    contextoSegundoGrau: string;
    contextoTst: string;
    api: string;
}
export interface SecurityEnvironment {
    api: string;
    clientId: string;
    clientSecret: string;
}
export interface EndpointsEnvironment {
    comum: string;
    administracao?: string;
    centralMandados?: string;
    pesquisaTextual?: string;
    sif?: string;
    etiquetas?: string;
    gigs?: string;
    jobs?: string;
    dominioBase?: string;
}
export interface ConfiguracaoEnvironment {
    production: boolean;
    endpoints: EndpointsEnvironment;
    security: SecurityEnvironment;
    legado: LegadoEnvironment;
    sistema: SistemaEnvironment;
    kz?: KzEnvironment;
    modulos?: ModulosEnvironment;
}
