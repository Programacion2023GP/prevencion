import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdictionsComponent } from './adictions.component';

describe('AdictionsComponent', () => {
  let component: AdictionsComponent;
  let fixture: ComponentFixture<AdictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdictionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
