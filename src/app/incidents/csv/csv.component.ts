import { Component, OnInit } from '@angular/core';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  csvBody = '';

  constructor(private incService: IncidentsService) { }

  ngOnInit() {
    this.csvBody = this.incService.generateCsv();
  }
}
