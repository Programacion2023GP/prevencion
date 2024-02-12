import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteracyComponent } from './literacy.component';

describe('LiteracyComponent', () => {
  let component: LiteracyComponent;
  let fixture: ComponentFixture<LiteracyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiteracyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiteracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
