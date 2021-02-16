import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagensMensagensTelasComponent } from './contagens-mensagens-telas.component';

describe('ContagensMensagensTelasComponent', () => {
  let component: ContagensMensagensTelasComponent;
  let fixture: ComponentFixture<ContagensMensagensTelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagensMensagensTelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContagensMensagensTelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
