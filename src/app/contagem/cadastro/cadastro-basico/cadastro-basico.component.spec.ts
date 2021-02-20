import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemCadastroBasicoComponent } from './cadastro-basico.component';

describe('ContagensCadastroComponent', () => {
  let component: ContagemCadastroBasicoComponent;
  let fixture: ComponentFixture<ContagemCadastroBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemCadastroBasicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagemCadastroBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
