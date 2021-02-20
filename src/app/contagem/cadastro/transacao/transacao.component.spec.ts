import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContagemCadastroArquivoReferenciadoComponent } from './contagem-cadastro-arquivo-referenciado.component';


describe('ContagensDetalhesComponent', () => {
  let component: ContagemCadastroArquivoReferenciadoComponent;
  let fixture: ComponentFixture<ContagemCadastroArquivoReferenciadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemCadastroArquivoReferenciadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagemCadastroArquivoReferenciadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
