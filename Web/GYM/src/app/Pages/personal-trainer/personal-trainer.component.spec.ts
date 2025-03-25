import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainerComponent } from './personal-trainer.component';

describe('PersonalTrainerComponent', () => {
  let component: PersonalTrainerComponent;
  let fixture: ComponentFixture<PersonalTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
