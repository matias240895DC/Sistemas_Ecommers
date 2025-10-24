import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscripcionDenegada } from './reinscripcion-denegada';

describe('ReinscripcionDenegada', () => {
  let component: ReinscripcionDenegada;
  let fixture: ComponentFixture<ReinscripcionDenegada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinscripcionDenegada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinscripcionDenegada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
