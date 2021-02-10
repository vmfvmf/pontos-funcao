import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsCadastroComponent } from './sprints-cadastro.component';

describe('SprintsCadastroComponent', () => {
  let component: SprintsCadastroComponent;
  let fixture: ComponentFixture<SprintsCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintsCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
