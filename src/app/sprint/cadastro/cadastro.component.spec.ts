import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCadastroComponent } from './cadastro.component';

describe('SprintsCadastroComponent', () => {
  let component: SprintCadastroComponent;
  let fixture: ComponentFixture<SprintCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
