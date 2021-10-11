export enum ContagemEscopoEnum{
  SISTEMA = "SISTEMA",
  PROJETO = "PROJETO",
  SPRINT = "SPRINT"
}

export const ContagemEscopoDesc = {
  [ContagemEscopoEnum.PROJETO]: 'Projeto',
  [ContagemEscopoEnum.SPRINT]: 'Sprint',
  [ContagemEscopoEnum.SISTEMA]: 'Sistema'
};

export const contagemEscoposArray = [ContagemEscopoEnum.PROJETO, ContagemEscopoEnum.SISTEMA, ContagemEscopoEnum.SPRINT];
