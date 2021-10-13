import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoCadastroComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: ProjetoCadastroComponent;
  let fixture: ComponentFixture<ProjetoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
