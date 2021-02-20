import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemCadastroComponent } from './contagem-cadastro.component';

describe('ContagensCadastroComponent', () => {
  let component: ContagemCadastroComponent;
  let fixture: ComponentFixture<ContagemCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagemCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
