import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri8Component } from './nutri8.component';

describe('Nutri8Component', () => {
  let component: Nutri8Component;
  let fixture: ComponentFixture<Nutri8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
