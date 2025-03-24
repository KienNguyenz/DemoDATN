import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutri2Component } from './nutri2.component';

describe('Nutri2Component', () => {
  let component: Nutri2Component;
  let fixture: ComponentFixture<Nutri2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutri2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Nutri2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
