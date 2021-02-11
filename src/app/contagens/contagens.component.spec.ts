import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensComponent } from './contagens.component';

describe('ContagensComponent', () => {
  let component: ContagensComponent;
  let fixture: ComponentFixture<ContagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
