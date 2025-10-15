import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCreado } from './usuario-creado';

describe('UsuarioCreado', () => {
  let component: UsuarioCreado;
  let fixture: ComponentFixture<UsuarioCreado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCreado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCreado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
