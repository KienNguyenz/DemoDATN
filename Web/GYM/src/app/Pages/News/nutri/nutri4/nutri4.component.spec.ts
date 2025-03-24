import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri4Component } from './nutri4.component';

describe('Nutri4Component', () => {
  let component: Nutri4Component;
  let fixture: ComponentFixture<Nutri4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
