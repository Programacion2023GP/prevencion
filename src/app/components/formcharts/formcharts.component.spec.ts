import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormchartsComponent } from './formcharts.component';

describe('FormchartsComponent', () => {
  let component: FormchartsComponent;
  let fixture: ComponentFixture<FormchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormchartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
