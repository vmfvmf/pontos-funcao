import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedTabelaComponent } from './tabela.component';

describe('DedComponent', () => {
  let component: DedTabelaComponent;
  let fixture: ComponentFixture<DedTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DedTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DedTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
