## Índice:
1. [Data-table](#1-data-table)
2. [Data-column](#2-data-column)
3. [Paginador](#3-paginador)

## 1.  Data-table
O `data-table` é um componente para renderizar dados em formato de tabela, utilizando o componente [`paginador`](./PaginadorComponent.html) para paginar os dados e a diretiva [`data-column`](../directives/DataColumnDirective.html) para definir as colunas.
Caso não haja registros uma mensagem é mostrada. As colunas devem ser informadas individualmente, cada uma com sua peculiaridade.
Toda vez que houver uma mudança na página mostrada, um evento de paginação é lançado (`onPaginar`).
  
#### Exemplo de uso:
**Diretiva HTML:**
```html
<pje-data-table [value]="paginaAtual"
  [totalRegistros]="totalRegistros"
  listrado = "false"
  [tamanhos]="[5,10,15]"
  [tamanhoPadrao]="5"
  [mensagemVazio]="'Não há registros para essa tabela'"
  (onPaginar)="fazerPaginacao($event)">

  <!-- essa coluna é padrão e pode ser ordenada -->
  <pje-data-column header="Header A" [value]="'a'" ordenar="true"></pje-data-column>

  <!-- essa coluna possui um novo template para os dados -->
  <pje-data-column header="Header B" [value]="'b'">
    <ng-template let-item="cellData">
      <span style="text-decoration: underline;">{{item}}</span>
    </ng-template>
  </pje-data-column>

  <!-- essa coluna possui um novo template para o seu cabeçalho(#header) e para os dados(#body) -->
  <pje-data-column header="Header C" [value]="'c'">

    <!-- template para os dados -->
    <ng-template let-item="cellData" let-linha="cellRow" let-coluna="cellColumn" #body>
      Celula customizada:<span>{{item}},linha:{{linha}},coluna:{{coluna}};</span>
    </ng-template>

    <!-- template para o cabeçalho -->
    <ng-template let-cabecalho="header" #header>
      Novo cabeçalho:<span style="text-decoration: underline;">{{cabecalho}}</span>
    </ng-template>
  </pje-data-column>

</pje-data-table>
```

**Typescript:**
```javascript
    // essa variável simula todos os dados  
    data = [{a:"a",b:"b",c:"c"},{a:"a2",b:"b2",c:"c2"},{a:"a3",b:"b3",c:"c3"},  
            {a:"a4",b:"b4",c:"c4"},{a:"a5",b:"b5",c:"c5"},{a:"a6",b:"b6",c:"c6"},  
            {a:"a7",b:"b7",c:"c7"},{a:"a8",b:"b8",c:"c8"},{a:"a9",b:"b9",c:"c9"},  
            {a:"a10",b:"b10",c:"c10"},{a:"a11",b:"b11",c:"c11"},{a:"a12",b:"b12",c:"c12"},  
            {a:"a13",b:"b13",c:"c13"},{a:"a14",b:"b14",c:"c14"},{a:"a15",b:"b15",c:"c15"}];
      
    //essa variável contém a quantidade total de todos os registros em todas as páginas
    totalRegistros: number;
    
    //essa variável guarda a pagina atual dos dados
    paginaAtual: Object[];

    // essa função representa uma paginação no front-end
    fazerPaginacao(evento: PaginarEvento){
      console.log(`Nova Pagina, numero:${evento.pagina},
                    registros por pagina:${evento.tamanhoPagina},
                    campo a ser ordenado:${evento.ordenar},
                    a ordem é ascendente:${evento.ascendente}`);

      this.totalRegistros = this.data.length;
      const registroInicial = (evento.pagina-1)*evento.tamanhoPagina;
      const registroFinal = (evento.pagina)*evento.tamanhoPagina;

      this.paginaAtual = this.data.slice(registroInicial, registroFinal);
    }
```

**Atributos e Eventos:**

| Atributo          | Obrigatório    | Descrição      | Padrão     |
| :---------------- | :------------- | :------------- |:---------- |
| value             | Sim   | Objeto que guarda os valores da pagina atual | não se aplica |
| listrado          | Não   | Indica se a tabela deve ser zebrada          | `true` |
| totalRegistros    | Sim   | Indica o total de registros entre todas as páginas | não se aplica |
| tamanhos          | Não   | Indica os possíveis valores de registros por página. As opções serão mostradas ao usuário | `[ 5, 10, 15, 20, 50]`|
| tamanhoPadrao     | Não   | Indica qual o tamanho de página que virá selecionado. Caso não esteja entre os possíveis valores será ignorado | 10 |
| mensagemVazio     | Não   | Mensagem mostrada quando não há registros    | 'Não há registros' |
| corDaLinhaOnClick | Não   | Indica a cor que uma linha da tabela terá ao ser clicada, mantendo a cor padrão da tabela quando não preenchida | não se aplica |

## 2.  Data-column
O `data-column` é usado em conjunto com a `data-table` para registrar o comportamento de cada coluna da tabela. 

Um `ng-template` pode ser inserido dentro da `data-column` para alterar e customizar o comportamento do corpo (dados) ou do cabeçalho. Em caso de um único template, ele será usado para o corpo da coluna, caso haja mais de um, ambos devem ser anotados com `#header` para o template do cabeçalho e `#body` para o template do corpo.

O Exemplo se encontra no 'Data-table'.

**Valores exportados para os templates (ver diretiva do angular `let`):**

#### Body

| Nome             | Conteúdo           |
| :-------------  |:-------------        |
| cellData        | Valor da propriedade do objeto naquela linha e coluna |
| cellRow        | Índice da linha, de 0 a N      |
| cellColumn | Índice da coluna, de 0 a N      |
| rowData | Valor da propriedade do objeto naquela linha (corresponde ao item de `[*ngFor="let item.."]`)  |

#### Header

| Nome        | Conteúdo           |
| :------------- |:-------------|
| header      | Conteúdo do cabeçalho |

**Atributos e Eventos:**

| Atributo        | Obrigatório | Descrição  | Padrão  |
| :-------------- |:-------------  | :-------------|:--------- |
| value    | Sim | Nome da propriedade (`string`) do objeto que será mostrado na coluna. Exemplo: ```objeto = {a:"propriedade A", b:5}; value = "a"; objeto[value] = "nova propriedade A";``` | não se aplica|
| header     | Não     |  Valor a ser mostrado no cabeçalho | nenhum |
| ordenar | Sim | A coluna pode ser ordenada? | `false` |
| nameTabela | Não | Valor para propriedade `name` da tabela | nenhum |
| linhaDivisoraPaginador | Não | Exibir linha divisora entre o fim da tabela e o paginador | false|


## 3.  Paginador
O paginador é usado para paginar elementos, sempre que necessário ele irá calcular informações da página e lançar um evento(`onPaginar`).
Cabe ao programador pegar o evento e realizar a paginação, front-end ou back-end. O método `calcularPaginas` do paginador pode ser usado para recalcular as páginas e lançar o evento correspondente.

### Exemplo de uso:

**Diretiva HTML:**
```html
 <pje-paginador  
    (onPaginar)="novaPagina($event)" 
    [totalRegistros]="totalRegistros" 
     [tamanhosPaginas]="[10,20,30]"
    [tamanhoPadrao]="10">
  </pje-paginador>
```

**Atributos e Eventos:**

| Atributo        | Obrigatório | Descrição  | Padrão  |
| :-------------- |:-------------  | :-------------|:--------- |
| tamanhosPaginas    | Não | Indica os possíveis valores de registros por página. Serão as opções mostradas ao usuário | `[5, 10, 15, 20, 50]` |
| totalRegistros | Sim | Indica o total de registros entre todas as páginas | não se aplica|
| tamanhoPadrao | Não | Indica qual o tamanho de página que virá selecionado. Caso não esteja entre os possíveis valores será ignorado | 10 |