import { element, by } from 'protractor';
import { ENUM_MSG_RN } from '../Utils/Data/EnumMsgRN';
import { PageElementInterface } from './trt15-page-element';

export let defaultPageStructure: Array<PageElementInterface> = [
  { id: 'ok', buttonTextFinder: 'OK' },
  { id: 'sim', buttonTextFinder: 'Sim' },
  { id: 'nao', buttonTextFinder: 'Não' },
  {
    id: 'sucesso_salvar',
    tagNameFinder: 'simple-snack-bar',
    text: ENUM_MSG_RN.RN0006_SUCESSO_GRAVAR
  },
  {
    id: 'sucesso_editar',
    tagNameFinder: 'simple-snack-bar',
    text: ENUM_MSG_RN.RN0007_SUCESSO_EDITAR
  },
  {
    id: 'sucesso_excluir',
    tagNameFinder: 'simple-snack-bar',
    text: ENUM_MSG_RN.RN0008_SUCESSO_EXCLUSAO
  },
  {
    id: 'botao-menu',
    cssfinder: 'i[class*="botao-menu"]'
  }
];
