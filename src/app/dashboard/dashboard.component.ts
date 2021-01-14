import { Component, OnInit } from '@angular/core'; 
import { country } from '../data';
import { exporter } from '../exporter';
import { importer } from '../importer';
import { month } from '../month';
import { port } from '../port';
import { unit } from '../unit';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  country:any [];
  importer:any [];
  exporter:any [];
  unit:any [];
  port:any [];
  month:any [];
  active = 4;
  view: any[] = [600, 500];
  constructor() { 
    Object.assign(this, {country}, {importer}, {exporter}, {unit}, {port}, {month});
  }
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;  
  legend: boolean = true;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  selectedItem:0;
  showLabels = true; 
  ngOnInit() {
  }   
   
}
 