import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri7Component } from './nutri7.component';

describe('Nutri7Component', () => {
  let component: Nutri7Component;
  let fixture: ComponentFixture<Nutri7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
