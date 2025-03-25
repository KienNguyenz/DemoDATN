import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri6Component } from './nutri6.component';

describe('Nutri6Component', () => {
  let component: Nutri6Component;
  let fixture: ComponentFixture<Nutri6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
