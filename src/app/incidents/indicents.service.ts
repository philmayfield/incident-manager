import {EventEmitter, Injectable} from '@angular/core';
import { Incident } from './incident.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  incidentsChanged = new EventEmitter<Incident[]>();

  incidents: Incident[] = [
    {
      id: 1,
      name: 'Lost laptop',
      discovered: '2018-2-19',
      description: 'Doctor lost his laptop while on vacation.',
      department: 'HR'
    }
  ];

  constructor(private router: Router) { }

  getIncidents() {
    return this.incidents.slice();
  }

  getIncident(id: number) {
    return id && this.incidents.find(inc => inc.id === id);
  }

  createIncident(incident: Incident) {
    this.incidents.push(incident);
    this.incidentsChanged.emit(this.getIncidents());
  }

  updateIncident(updatedIncident: Incident) {
    const {id} = updatedIncident;
    const incident = id && this.getIncident(id);

    if (incident) {
      incident.name = updatedIncident.name;
      incident.discovered = updatedIncident.discovered;
      incident.description = updatedIncident.description;
      incident.department = updatedIncident.department;

      this.incidentsChanged.emit(this.getIncidents());
      this.router
        .navigate(['/'])
        .catch(err => {
          throw err;
        });
    }
  }

  deleteIncident(id: number) {
    const incident = this.getIncident(id);

    if (incident) {
      this.incidents = this.incidents.filter(inc => inc.id !== id);

      this.incidentsChanged.emit(this.getIncidents());
    }
  }
}
