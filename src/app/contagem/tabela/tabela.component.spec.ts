import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemTabelaComponent } from './tabela.component';

describe('ContagensComponent', () => {
  let component: ContagemTabelaComponent;
  let fixture: ComponentFixture<ContagemTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagemTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
