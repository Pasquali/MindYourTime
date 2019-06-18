import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() data: Array<any>;
  @ViewChild('canvas') canvas: ElementRef;
  chart;
  // datad = [20, 10, 15, 12, 10, 0, 5];
  labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  ready = false;
  today = new Date();
  constructor() {

  }

  ngOnInit() {
    let day: number = this.today.getDay();
    if (day === 6) {
      day = 0;
    } else {
      day++;
    }
    const todaysLabels: any = [];
    let count = 1;
    while (count < 7) {
      todaysLabels.push(this.labels[day]);
      day++;
      count++;
      if ( day > 6 ) {
        day = 0;
      }
    }
    todaysLabels.push('Today');
    this.chart = new Chart({
      chart: {
        type: 'column',
        backgroundColor: '#363636',
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Breaths',
          data: this.data
        }
      ],
      title: {
        text: 'Minutes Meditating'
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: todaysLabels
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: ''
      }
      }
  });
  this.ready = true;
  }
  ngAfterViewInit() {

}

}
