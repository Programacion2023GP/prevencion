import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolenceComponent } from './violence.component';

describe('ViolenceComponent', () => {
  let component: ViolenceComponent;
  let fixture: ComponentFixture<ViolenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViolenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
