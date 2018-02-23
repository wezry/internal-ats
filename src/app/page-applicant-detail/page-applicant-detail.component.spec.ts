import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageApplicantDetailComponent } from './page-applicant-detail.component';

describe('PageApplicantDetailComponent', () => {
  let component: PageApplicantDetailComponent;
  let fixture: ComponentFixture<PageApplicantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageApplicantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageApplicantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
