import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri1Component } from './nutri1.component';

describe('Nutri1Component', () => {
  let component: Nutri1Component;
  let fixture: ComponentFixture<Nutri1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
