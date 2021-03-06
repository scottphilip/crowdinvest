import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDetailComponent } from './funddetail.component';

describe('FundDetailComponent', () => {
  let component: FundDetailComponent;
  let fixture: ComponentFixture<FundDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
