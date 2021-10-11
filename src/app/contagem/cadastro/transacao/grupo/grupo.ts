import { Contagem } from '../../../contagem';
import { HttpParams } from "@angular/common/http";
export class Grupo {
  id: number;
  nome: String;
  contagem: Contagem;

  constructor(contagem?: Contagem){
    this.contagem = contagem ? contagem : new Contagem();
  }

  public static toHttpParams(iGrupo: Grupo): HttpParams {
    let httpParams = new HttpParams();
    //let httpParams = this.paginacao.toHttpParams();

      if (iGrupo.nome !== undefined) {
        httpParams = httpParams.set('nome', iGrupo.nome.toString());
      }
      if (iGrupo.contagem !== undefined) {
        httpParams = httpParams.set('contagem.id', iGrupo.contagem.id.toString());
      }
      return httpParams;
    }
}
