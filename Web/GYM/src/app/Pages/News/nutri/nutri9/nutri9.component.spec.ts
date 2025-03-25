import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri9Component } from './nutri9.component';

describe('Nutri9Component', () => {
  let component: Nutri9Component;
  let fixture: ComponentFixture<Nutri9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
