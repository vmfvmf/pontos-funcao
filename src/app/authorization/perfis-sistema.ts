import { Trt15Perfil } from 'trt15-base-app';

export class PerfisSistema {

  static ADMINISTRADOR = new Trt15Perfil('ADMINISTRADOR', 'Administrador');

  static PERFIS: Trt15Perfil[] = [
    PerfisSistema.ADMINISTRADOR
  ];

}
