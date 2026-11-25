import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cccteam } from './cccteam';

describe('Cccteam', () => {
  let component: Cccteam;
  let fixture: ComponentFixture<Cccteam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cccteam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cccteam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
