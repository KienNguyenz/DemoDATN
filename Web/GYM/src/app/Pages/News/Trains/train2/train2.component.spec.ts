import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Train2Component } from './train2.component';

describe('Train2Component', () => {
  let component: Train2Component;
  let fixture: ComponentFixture<Train2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Train2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Train2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
