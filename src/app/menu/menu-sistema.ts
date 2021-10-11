import { PerfisSistema } from "../authorization/perfis-sistema";
import { Trt15MenuItem } from "trt15-base-app";

export class MenuSistema {
  static MENU: Trt15MenuItem[] = [
    {
        nome: "Gerenciador de Sistemas",
        url: "/sistemas",
        urlHref: null,
        perfilAcesso: [PerfisSistema.ADMINISTRADOR],
        itemMenuLateral: { icone: "fas fa-desktop" },
        itens: null,
      },
      {
        nome: "Gerenciador de DEDs",
        url: "/deds",
        urlHref: null,
        perfilAcesso: [PerfisSistema.ADMINISTRADOR],
        itemMenuLateral: { icone: "fas fa-cog" },
        itens: null,
      },
    {
      nome: "Gerenciador de Sprints",
      url: "/sprints",
      urlHref: null,
      perfilAcesso: [PerfisSistema.ADMINISTRADOR],
      itemMenuLateral: { icone: "far fa-calendar-alt" },
      itens: null,
    },
    {
      nome: "Gerenciador de Contagens",
      url: "/contagens",
      urlHref: null,
      perfilAcesso: [PerfisSistema.ADMINISTRADOR],
      itemMenuLateral: { icone: "fas fa-list-ol" },
      itens: null,
    },
  ];
}
