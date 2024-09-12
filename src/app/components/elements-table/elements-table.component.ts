import { Component, OnInit } from '@angular/core';
import { ElementsService } from '../../services/elements.service';
import { PeriodicElement } from '../../models/element.model';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [MatTableModule, NgFor],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss'
})
export class ElementsTableComponent implements OnInit {
  elementsData: PeriodicElement[] = [];
  columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol'];
  headersToDisplay: string[] = ['Number', 'Name', 'Weight', 'Symbol'];

  constructor(private elementsService: ElementsService) {

  };

  ngOnInit(): void {
    this.getElements();
    console.log(this.elementsData)
  }

  getElements(): void {
    this.elementsData = this.elementsService.getElements();
  }

  getColumnName(column: string): string {
    switch (column) {
      case 'position': return 'Number';
      case 'name': return 'Name';
      case 'weight': return 'Weight';
      case 'symbol': return 'Symbol';
      default: return "";
    }
  }
}
