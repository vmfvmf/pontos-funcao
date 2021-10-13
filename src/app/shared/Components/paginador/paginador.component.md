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