import { PageElementInterface } from '../../shared/trt15-tests/trt15-page-element';
import { ENUM_PAGE_ELEMENT_TYPE } from '../../shared/Utils/Data/EnumPageElementType';
import { element, by } from 'protractor';


export let loginPageStructure: Array<PageElementInterface> = [
  {
    id: 'username',
    required: true,
    type: ENUM_PAGE_ELEMENT_TYPE.INPUT_TEXT,
    maxlenght: 30,
    defaultValue: '',
    enabled: true
  },
  {
    id: 'password',
    required: true,
    type: ENUM_PAGE_ELEMENT_TYPE.INPUT_PASSWORD,
    maxlenght: 20,
    defaultValue: '',
    enabled: true
  },
  { id: 'kc-login', type: ENUM_PAGE_ELEMENT_TYPE.BUTTON, enabled: false },
  {
    id: 'link_deslogar',
    cssfinder: 'a[href*="app-pontos-funcao-frontend/"]'
  },
  { id: 'deslogar', cssfinder: 'button[mattooltip="Desconectar"]'  }
];
