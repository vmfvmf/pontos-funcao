import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasCadastroComponent } from './tabelas-cadastro.component';

describe('TabelasCadastroComponent', () => {
  let component: TabelasCadastroComponent;
  let fixture: ComponentFixture<TabelasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelasCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
