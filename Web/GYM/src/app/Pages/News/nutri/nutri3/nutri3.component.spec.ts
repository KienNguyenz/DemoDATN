import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri3Component } from './nutri3.component';

describe('Nutri3Component', () => {
  let component: Nutri3Component;
  let fixture: ComponentFixture<Nutri3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
