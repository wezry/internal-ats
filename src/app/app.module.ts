/* MODULES */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropDirectiveModule} from 'angular4-drag-drop';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { ApplicationCardComponent } from './application-card/application-card.component';
import { ApplicantCreateComponent } from './applicant-create/applicant-create.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

/* PAGE COMPONENTS (VIEWS) */
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageApplicantDetailComponent } from './pages/page-applicant-detail/page-applicant-detail.component';

/* SERVICES */
import { ApplicantStateService } from '../services/applicant-state/applicant-state.service';
import { ConfirmationModalService } from '../services/confirmation-modal/confirmation-modal.service';
import { QuestionBankComponent } from './question-bank/question-bank.component';

const appServices = [
  ApplicantStateService,
  ConfirmationModalService
];

const appComponents = [
  AppComponent,
  ApplicationCardComponent,
  ApplicantCreateComponent,
  ConfirmationModalComponent
];

const pageComponents = [
  PageApplicantDetailComponent,
  PageHomeComponent
];

const appRoutes: Routes = [
  // { path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  // { path: 'home', component: PageHomeComponent },
  { path: '', component: PageHomeComponent },
  { path: 'applicant-detail/:id', component: PageApplicantDetailComponent }
];

@NgModule({
  declarations: [
    ...appComponents,
    ...pageComponents,
    QuestionBankComponent
  ],
  entryComponents: [
    ApplicantCreateComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    DragDropDirectiveModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [...appServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
