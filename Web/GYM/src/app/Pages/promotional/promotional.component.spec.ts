import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalComponent } from './promotional.component';

describe('PromotionalComponent', () => {
  let component: PromotionalComponent;
  let fixture: ComponentFixture<PromotionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
