import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaCadastroComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: SistemaCadastroComponent;
  let fixture: ComponentFixture<SistemaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
