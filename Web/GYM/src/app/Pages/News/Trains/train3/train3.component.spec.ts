import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Train3Component } from './train3.component';

describe('Train3Component', () => {
  let component: Train3Component;
  let fixture: ComponentFixture<Train3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Train3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Train3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
