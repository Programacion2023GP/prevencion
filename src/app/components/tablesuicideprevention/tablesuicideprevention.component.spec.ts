import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesuicidepreventionComponent } from './tablesuicideprevention.component';

describe('TablesuicidepreventionComponent', () => {
  let component: TablesuicidepreventionComponent;
  let fixture: ComponentFixture<TablesuicidepreventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesuicidepreventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablesuicidepreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
