import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentifiedComponent } from './indentified.component';

describe('IndentifiedComponent', () => {
  let component: IndentifiedComponent;
  let fixture: ComponentFixture<IndentifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentifiedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndentifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
