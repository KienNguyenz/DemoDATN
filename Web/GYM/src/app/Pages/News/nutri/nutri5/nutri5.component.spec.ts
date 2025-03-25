import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri5Component } from './nutri5.component';

describe('Nutri5Component', () => {
  let component: Nutri5Component;
  let fixture: ComponentFixture<Nutri5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
