import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensDetalhesComponent } from './contagens-detalhes.component';

describe('ContagensDetalhesComponent', () => {
  let component: ContagensDetalhesComponent;
  let fixture: ComponentFixture<ContagensDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
