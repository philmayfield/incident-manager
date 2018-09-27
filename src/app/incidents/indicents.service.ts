import { Injectable } from '@angular/core';
import { Incident } from './incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  incidents: Incident[] = [
    {
      id: 1,
      name: 'Lost laptop',
      discovered: '2018-2-19',
      description: 'Doctor lost his laptop while on vacation.',
      department: 'HR'
    }
  ];

  constructor() { }

  getIncidents() {
    return this.incidents.slice();
  }

  addIncident(incident: Incident) {
    this.incidents.push(incident);
  }

  editIncident(id: number, details: {name: string, discovered: string, description: string, department: string}) {
    const incident = this.incidents.find(inc => inc.id === id);

    if (incident) {
      incident.name = details.name;
      incident.discovered = details.discovered;
      incident.description = details.description;
      incident.department = details.department;
    }
  }

  deleteIncident(id: number) {
    const incident = this.incidents.find(inc => inc.id === id);

    if (incident) {
      this.incidents = this.incidents.filter(inc => inc.id !== id);
    }
  }
}
