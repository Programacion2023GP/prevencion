import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActwasComponent } from './actwas.component';

describe('ActwasComponent', () => {
  let component: ActwasComponent;
  let fixture: ComponentFixture<ActwasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActwasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActwasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
