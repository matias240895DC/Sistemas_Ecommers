import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsList } from './gyms-list';

describe('GymsList', () => {
  let component: GymsList;
  let fixture: ComponentFixture<GymsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
