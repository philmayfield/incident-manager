import { Component, OnInit } from '@angular/core';
import {IncidentsService} from '../incidents.service';
import {Incident} from '../incident.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {
  incident: Incident;

  constructor(private incService: IncidentsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const {id} = this.route.snapshot.params;
    this.incident = this.incService.getIncident(+id);
  }

  onClickEditBtn() {
    console.log('click');
    this.router
      .navigate(['edit'], {relativeTo: this.route})
      .catch(err => {
        throw err;
      });
  }
}
