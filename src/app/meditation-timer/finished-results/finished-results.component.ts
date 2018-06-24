import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-finished-results',
  templateUrl: './finished-results.component.html',
  styleUrls: ['./finished-results.component.css']
})
export class FinishedResultsComponent implements OnInit {
  @Input() sessionBreaths: number;
  @Input() sessionTime: any;

  constructor() { }

  ngOnInit() {
  }

}
