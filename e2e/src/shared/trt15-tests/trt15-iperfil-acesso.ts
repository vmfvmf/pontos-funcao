export interface IPerfilAcesso{
    tipoPerfil: ENUM_TIPO_PERFIL;
    listaItems: IPerfilAcessoItem[];
}

export interface IPerfilAcessoItem{
    item: string;
    perfilItem: string;
    
}

export enum ENUM_TIPO_PERFIL{
    LOTACAO = "Por Lotação",
    CARREIRA = "Por Carreira",
    CATEGORIA_USUARIO = "Por Categoria de Usuário",
    INDIVIDUAIS = "Individuais"
}