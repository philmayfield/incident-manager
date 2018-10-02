import { Component, OnInit } from '@angular/core';
import { IncidentsService } from '../incidents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from '../incident.model';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css'],
  providers: [DatePipe]
})
export class EditIncidentComponent implements OnInit {
  incident: Incident = new Incident();
  isNew = false;
  today: string;
  departments: string[] = ['HR', 'Finance', 'Legal'];

  constructor(private incService: IncidentsService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private datePipe: DatePipe) { }

  ngOnInit() {
    const {id} = this.route.snapshot.params;
    const today = this.datePipe.transform(new Date().toLocaleDateString(), 'yyyy-MM-dd');

    this.today = today;

    if (id && id === 'new') {
      this.isNew = true;
    } else {
      const foundIncident = id && this.incService.getIncident(+id);

      if (!!foundIncident) {
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

  onSubmit() {
    const {id} = this.incident;
    if (id === -1) {
      this.incService.createIncident(this.incident);
    } else {
      this.incService.updateIncident(this.incident);
    }
  }
}
