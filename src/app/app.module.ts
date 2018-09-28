import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentComponent } from './incidents/incident/incident.component';
import { EditIncidentComponent } from './incidents/edit-incident/edit-incident.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CsvComponent } from './incidents/csv/csv.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IncidentsComponent
  },
  {
    path: 'incident/:id',
    component: IncidentComponent
  },
  {
    path: 'incident/:id/edit',
    component: EditIncidentComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    IncidentComponent,
    EditIncidentComponent,
    NotFoundComponent,
    CsvComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
