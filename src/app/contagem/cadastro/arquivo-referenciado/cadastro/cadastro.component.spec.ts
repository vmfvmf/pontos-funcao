import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContagemCadastroArquivoReferenciadoCadastroComponent } from './contagem-cadastro-arquivo-referenciado-cadastro.component';

describe('ContagensArquivosLogicosComponent', () => {
  let component: ContagemCadastroArquivoReferenciadoCadastroComponent;
  let fixture: ComponentFixture<ContagemCadastroArquivoReferenciadoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemCadastroArquivoReferenciadoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagemCadastroArquivoReferenciadoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
