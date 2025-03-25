import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri10Component } from './nutri10.component';

describe('Nutri10Component', () => {
  let component: Nutri10Component;
  let fixture: ComponentFixture<Nutri10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
