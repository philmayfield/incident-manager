import { EventEmitter, Injectable } from '@angular/core';
import { Incident } from './incident.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  incidentNum = 2;
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

  createIncident(newIncident: Incident) {
    newIncident.id = this.incidentNum;

    this.incidents.push(newIncident);
    this.incIncidentNum();
    this.incidentsChanged.emit(this.getIncidents());
    this.navigateToList();
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
      this.navigateToList();
    }
  }

  deleteIncident(id: number) {
    const incident = this.getIncident(id);

    if (incident) {
      this.incidents = this.incidents.filter(inc => inc.id !== id);

      this.incidentsChanged.emit(this.getIncidents());
    }
  }

  generateCsv(): string {
    const tmpArr = [];
    const tempIncident = new Incident();
    const keys = Object.keys(tempIncident);

    for (const key of keys) {
      tmpArr.push(key);
    }

    let csvString = tmpArr.join(',');
    tmpArr.length = 0;

    for (const incident of this.incidents) {
      for (const key of keys) {
        tmpArr.push(String(incident[key]).replace(',', ''));
      }
      csvString += `\n${tmpArr.join(',')}`;
      tmpArr.length = 0;
    }

    return csvString;
  }

  incIncidentNum() {
    this.incidentNum++;
  }

  navigateToList() {
    this.router
      .navigate(['/'])
      .catch(err => {
        throw err;
      });
  }
}
