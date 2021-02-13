import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensFuncaoDadosComponent } from './contagens-funcao-dados.component';

describe('ContagensArquivosLogicosComponent', () => {
  let component: ContagensFuncaoDadosComponent;
  let fixture: ComponentFixture<ContagensFuncaoDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensFuncaoDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensFuncaoDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
