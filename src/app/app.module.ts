import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationCardComponent } from './application-card/application-card.component';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageApplicantDetailComponent } from './page-applicant-detail/page-applicant-detail.component';
import { DragDropDirectiveModule} from 'angular4-drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageApplicantCreateComponent } from './page-applicant-create/page-applicant-create.component';


const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: PageHomeComponent },
  { path: 'applicant-detail/:id', component: PageApplicantDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ApplicationCardComponent,
    PageHomeComponent,
    PageApplicantDetailComponent,
    PageApplicantCreateComponent
  ],
  entryComponents: [
    PageApplicantCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropDirectiveModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
