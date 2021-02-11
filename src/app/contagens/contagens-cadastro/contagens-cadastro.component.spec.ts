import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensCadastroComponent } from './contagens-cadastro.component';

describe('ContagensCadastroComponent', () => {
  let component: ContagensCadastroComponent;
  let fixture: ComponentFixture<ContagensCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
