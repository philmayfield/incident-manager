import { Component, OnInit } from '@angular/core';
import {IncidentsService} from './indicents.service';
import {Incident} from './incident.model';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  incidents: Incident[] = [];

  constructor(private incService: IncidentsService) { }

  ngOnInit() {
    this.incidents = this.incService.getIncidents();
  }

}
