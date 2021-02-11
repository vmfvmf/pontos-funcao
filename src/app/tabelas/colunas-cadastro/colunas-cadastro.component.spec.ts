import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColunasCadastroComponent } from './colunas-cadastro.component';

describe('ColunasCadastroComponent', () => {
  let component: ColunasCadastroComponent;
  let fixture: ComponentFixture<ColunasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColunasCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColunasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
