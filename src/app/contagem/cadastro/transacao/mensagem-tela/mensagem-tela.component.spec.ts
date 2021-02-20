import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemTelaComponent } from './mensagem-tela.component';

describe('ContagensMensagensTelasComponent', () => {
  let component: MensagemTelaComponent;
  let fixture: ComponentFixture<MensagemTelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemTelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemTelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
