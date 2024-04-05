import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbooksComponent } from './addbooks.component';

describe('AddbooksComponent', () => {
  let component: AddbooksComponent;
  let fixture: ComponentFixture<AddbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
