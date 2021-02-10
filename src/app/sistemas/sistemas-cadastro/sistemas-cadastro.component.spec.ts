import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasCadastroComponent } from './sistemas-cadastro.component';

describe('CadastroComponent', () => {
  let component: SistemasCadastroComponent;
  let fixture: ComponentFixture<SistemasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemasCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
