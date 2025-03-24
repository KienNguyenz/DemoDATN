import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Train1Component } from './train1.component';

describe('Train1Component', () => {
  let component: Train1Component;
  let fixture: ComponentFixture<Train1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Train1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Train1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
