import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedsCadastroComponent } from './deds-cadastro.component';

describe('CadastroComponent', () => {
  let component: DedsCadastroComponent;
  let fixture: ComponentFixture<DedsCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DedsCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DedsCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
