import { PageElementInterface } from './trt15-page-element';
import { element, by } from 'protractor';

export const keepbuttons: Array<PageElementInterface> = [
  { id: 'salvar', buttonTextFinder: 'Salvar' },
  { id: 'cancelar', buttonTextFinder: 'Cancelar' }
];
