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
import { PageHomeComponent } from './page-home/page-home.component';
import { PageApplicantDetailComponent } from './page-applicant-detail/page-applicant-detail.component';
import { ApplicantCreateComponent } from './applicant-create/applicant-create.component';

import {ApplicantStateService} from './services/applicant-state.service';

const appServices = [
  ApplicantStateService
];

const appComponents = [
  AppComponent,
  ApplicationCardComponent,
  ApplicantCreateComponent,
  PageApplicantDetailComponent,
  PageHomeComponent
];

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: PageHomeComponent },
  { path: 'applicant-detail/:id', component: PageApplicantDetailComponent }
];

@NgModule({
  declarations: [
    ...appComponents
  ],
  entryComponents: [
    ApplicantCreateComponent
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
