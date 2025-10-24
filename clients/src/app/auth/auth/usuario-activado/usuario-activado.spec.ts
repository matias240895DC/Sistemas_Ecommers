import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioActivado } from './usuario-activado';

describe('UsuarioActivado', () => {
  let component: UsuarioActivado;
  let fixture: ComponentFixture<UsuarioActivado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioActivado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioActivado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
