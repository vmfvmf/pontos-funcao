import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedsComponent } from './deds.component';

describe('DedsComponent', () => {
  let component: DedsComponent;
  let fixture: ComponentFixture<DedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
