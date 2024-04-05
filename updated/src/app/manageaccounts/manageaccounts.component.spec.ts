import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaccountsComponent } from './manageaccounts.component';

describe('ManageaccountsComponent', () => {
  let component: ManageaccountsComponent;
  let fixture: ComponentFixture<ManageaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageaccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
