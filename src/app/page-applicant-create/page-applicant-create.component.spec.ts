import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageApplicantCreateComponent } from './page-applicant-create.component';

describe('PageApplicantCreateComponent', () => {
  let component: PageApplicantCreateComponent;
  let fixture: ComponentFixture<PageApplicantCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageApplicantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageApplicantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
