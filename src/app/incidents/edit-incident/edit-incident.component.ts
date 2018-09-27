import { Component, OnInit } from '@angular/core';
import {IncidentsService} from '../indicents.service';
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
  departments: string[] = ['HR', 'Finance', 'Legal'];

  constructor(private incService: IncidentsService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    const {id} = this.route.snapshot.params;
    this.incident = id && this.incService.getIncident(+id);
  }

  onClickBack() {
    this.location.back();
  }

  onClickSave() {
    const {id} = this.incident;
    if (id) {
      // const updatedIncident = new Incident(id, this.name, this.discovered, this.description, this.department);
      this.incService.updateIncident(this.incident);
    }
  }
}
