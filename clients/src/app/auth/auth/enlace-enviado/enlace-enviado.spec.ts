import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlaceEnviado } from './enlace-enviado';

describe('EnlaceEnviado', () => {
  let component: EnlaceEnviado;
  let fixture: ComponentFixture<EnlaceEnviado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnlaceEnviado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlaceEnviado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
