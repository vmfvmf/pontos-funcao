import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensGrupoTransacoesComponent } from './contagens-grupo-transacoes.component';

describe('ContagensGrupoTranacoesComponent', () => {
  let component: ContagensGrupoTransacoesComponent;
  let fixture: ComponentFixture<ContagensGrupoTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensGrupoTransacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensGrupoTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
