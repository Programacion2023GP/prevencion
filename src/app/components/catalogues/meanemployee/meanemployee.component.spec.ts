import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanemployeeComponent } from './meanemployee.component';

describe('MeanemployeeComponent', () => {
  let component: MeanemployeeComponent;
  let fixture: ComponentFixture<MeanemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeanemployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeanemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
