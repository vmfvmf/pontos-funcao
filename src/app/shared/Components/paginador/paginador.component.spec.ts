import { CommonModule } from '@angular/common';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PJeBaseMaterialModule } from '../../pje-base-material/pje-base-material.module';
import { PaginadorComponent } from './paginador.component';

describe('PaginadorComponent', () => {
  let component: PaginadorComponent;
  let fixture: ComponentFixture<PaginadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorComponent ],
      imports: [
        CommonModule,
        FormsModule,
        PJeBaseMaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve calcular as paginas a cada mudanca', () => {
    spyOn(component, 'calcularPaginas');

    const changes: SimpleChanges = {
      pagina: new SimpleChange(undefined, 1, true)
    };

    component.ngOnChanges(changes);
    // https://github.com/palantir/tslint/issues/3755
    // tslint:disable-next-line
    expect(component.calcularPaginas).toHaveBeenCalled();
  });

  it('deve desabilitar botoes quando não há páginas', () => {
    component.pagina = 0;
    component.totalPaginas = 0;
    component.totalRegistros = 0;
    component.calcularPaginas();

    expect(component.temProximaPagina).toBeFalsy();
    expect(component.temPaginaAnterior).toBeFalsy();

    component.pagina = 1;
    component.totalPaginas = 4;
    component.totalRegistros = 100;
    component.calcularPaginas();

    expect(component.temProximaPagina).toBeTruthy();
    expect(component.temPaginaAnterior).toBeFalsy();

    component.pagina = 4;
    component.totalPaginas = 4;
    component.totalRegistros = 100;
    component.registrosPorPagina = 25;
    component.calcularPaginas();

    expect(component.temProximaPagina).toBeFalsy();
    expect(component.temPaginaAnterior).toBeTruthy();
  });

  it('deve habilitar os botoes quando houver paginas', () => {
    component.pagina = 3;
    component.totalPaginas = 5;
    component.totalRegistros = 100;
    component.calcularPaginas();

    expect(component.temProximaPagina).toBeTruthy();
    expect(component.temPaginaAnterior).toBeTruthy();
  });

  it('deve avancar pagina', () => {
    component.pagina = 1;
    component.totalPaginas = 2;
    component.totalRegistros = 10;
    component.registrosPorPagina = 5;
    component.paginaSeguinte();

    expect(component.pagina).toBe(2);
  });

  it('deve ir para ultima pagina', () => {
    component.pagina = 1;
    component.totalPaginas = 5;
    component.totalRegistros = 25;
    component.registrosPorPagina = 5;
    component.ultimaPagina();

    expect(component.pagina).toBe(5);
  });

  it('deve voltar pagina', () => {
    component.pagina = 2;
    component.totalPaginas = 2;
    component.totalRegistros = 10;
    component.registrosPorPagina = 5;
    component.paginaAnterior();

    expect(component.pagina).toBe(1);
  });

  it('deve ir para primeira pagina', () => {
    component.pagina = 5;
    component.totalPaginas = 5;
    component.totalRegistros = 25;
    component.registrosPorPagina = 5;
    component.primeiraPagina();

    expect(component.pagina).toBe(1);
  });

  it('deve emitir evento toda vez que as paginas forem recalculadas', () => {
    spyOn(component.onPaginar, 'emit');
    component.pagina = 5;
    component.totalPaginas = 5;
    component.totalRegistros = 25;
    component.registrosPorPagina = 5;
    component.calcularPaginas();

    component.registrosPorPagina = 100;
    component.calcularPaginas();
// tslint:disable-next-line: no-unbound-method
    expect(component.onPaginar.emit).toHaveBeenCalled();
  });

  it('deve recalcular paginas ao mudar quantidade de registros por pagina', () => {
    component.pagina = 5;
    component.totalPaginas = 5;
    component.totalRegistros = 25;
    component.registrosPorPagina = 5;
    component.calcularPaginas();

    component.registrosPorPagina = 100;
    component.calcularPaginas();
    expect(component.pagina).toBe(1);

    component.pagina = 5;
    component.totalPaginas = 5;
    component.totalRegistros = 25;
    component.registrosPorPagina = 5;
    component.calcularPaginas();

    component.registrosPorPagina = 10;
    component.calcularPaginas();
    expect(component.pagina).toBe(3);
  });

  it('deve calcular paginas', () => {
    component.pagina = 1;
    component.totalRegistros = 25;
    component.registrosPorPagina = 5;
    component.calcularPaginas();

    expect(component.totalPaginas).toBe(5);
  });
});
