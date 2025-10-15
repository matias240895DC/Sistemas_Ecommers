import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraRestablecida } from './contra-restablecida';

describe('ContraRestablecida', () => {
  let component: ContraRestablecida;
  let fixture: ComponentFixture<ContraRestablecida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContraRestablecida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraRestablecida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
