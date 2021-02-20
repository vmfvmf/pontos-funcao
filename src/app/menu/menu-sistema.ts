import { PerfisSistema } from "../authorization/perfis-sistema";
import { Trt15MenuItem } from "trt15-base-app";

export class MenuSistema {
  static MENU: Trt15MenuItem[] = [
    {
      nome: "Gerenciador de DEDs",
      url: "/ded",
      urlHref: null,
      perfilAcesso: [PerfisSistema.ADMINISTRADOR],
      itemMenuLateral: { icone: "fas fa-cog" },
      itens: null,
    },
    {
        nome: "Gerenciador de Sistemas",
        url: "/sistema",
        urlHref: null,
        perfilAcesso: [PerfisSistema.ADMINISTRADOR],
        itemMenuLateral: { icone: "fas fa-desktop" },
        itens: null,
      },
    {
      nome: "Gerenciador de Sprints",
      url: "/sprint",
      urlHref: null,
      perfilAcesso: [PerfisSistema.ADMINISTRADOR],
      itemMenuLateral: { icone: "far fa-calendar-alt" },
      itens: null,
    },
    {
      nome: "Gerenciador de Contagens",
      url: "/contagem",
      urlHref: null,
      perfilAcesso: [PerfisSistema.ADMINISTRADOR],
      itemMenuLateral: { icone: "fas fa-list-ol" },
      itens: null,
    },
  ];
}
