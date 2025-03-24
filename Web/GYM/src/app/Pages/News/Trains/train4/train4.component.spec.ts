import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Train4Component } from './train4.component';

describe('Train4Component', () => {
  let component: Train4Component;
  let fixture: ComponentFixture<Train4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Train4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Train4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
