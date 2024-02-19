import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablechartsComponent } from './tablecharts.component';

describe('TablechartsComponent', () => {
  let component: TablechartsComponent;
  let fixture: ComponentFixture<TablechartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablechartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
