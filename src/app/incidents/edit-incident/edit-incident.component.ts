import { Component, OnInit } from '@angular/core';
import {IncidentsService} from '../incidents.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Incident} from '../incident.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {
  incident: Incident;
  isNew = false;
  today: string;
  departments: string[] = ['HR', 'Finance', 'Legal'];

  constructor(private incService: IncidentsService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    const {id} = this.route.snapshot.params;
    const todayString = new Date().toLocaleDateString();
    let [month, day, year] = todayString.split('/');
    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;
    year = year; // linting was throwing an error without re-assigning
    const today = `${year}-${month}-${day}`;

    this.today = today;

    if (id && id === 'new') {
      this.isNew = true;
      this.incident = new Incident(-1, '', today, '', '');
    } else {
      const foundIncident = id && this.incService.getIncident(+id);

      if (foundIncident) {
        this.incident = foundIncident;
      } else {
        this.router
          .navigate(['/'])
          .catch(err => {
            throw err;
          });
      }
    }
  }

  onClickBack() {
    this.location.back();
  }

  onClickSave() {
    const {id} = this.incident;
    if (id === -1) {
      this.incService.createIncident(this.incident);
    } else {
      this.incService.updateIncident(this.incident);
    }
  }
}
