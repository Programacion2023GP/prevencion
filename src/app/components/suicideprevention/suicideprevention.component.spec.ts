import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicidepreventionComponent } from './suicideprevention.component';

describe('SuicidepreventionComponent', () => {
  let component: SuicidepreventionComponent;
  let fixture: ComponentFixture<SuicidepreventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuicidepreventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuicidepreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
