import { TransacaoCadastroComponent } from './cadastro.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ContagensTransacoesComponent', () => {
  let component: TransacaoCadastroComponent;
  let fixture: ComponentFixture<TransacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacaoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
