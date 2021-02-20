import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedCadastroComponent } from './cadastro.component';

describe('CadastroComponent', () => {
  let component: DedCadastroComponent;
  let fixture: ComponentFixture<DedCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DedCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DedCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
