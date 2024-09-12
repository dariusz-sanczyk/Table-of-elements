import { Component, OnInit } from '@angular/core';
import { ElementsService } from '../../services/elements.service';
import { PeriodicElement } from '../../models/element.model';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss'
})
export class ElementsTableComponent implements OnInit {
  elementsData: PeriodicElement[] = [];

  constructor(private elementsService: ElementsService) {};

  ngOnInit(): void {
    this.getElements();
    console.log(this.elementsData)
  }

  getElements() {
    this.elementsData = this.elementsService.getElements();
  }
}
