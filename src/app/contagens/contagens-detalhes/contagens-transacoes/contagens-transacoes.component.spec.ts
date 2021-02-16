import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensTransacoesComponent } from './contagens-transacoes.component';

describe('ContagensTransacoesComponent', () => {
  let component: ContagensTransacoesComponent;
  let fixture: ComponentFixture<ContagensTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensTransacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
