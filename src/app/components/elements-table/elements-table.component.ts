import { Component } from '@angular/core';
import { ElementsService } from '../../services/elements.service';
import { PeriodicElement } from '../../models/element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, NgFor],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss'
})
export class ElementsTableComponent {
  elementsData: PeriodicElement[] = [];
  dataSource: MatTableDataSource<PeriodicElement>;
  columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private elementsService: ElementsService) {
    this.dataSource = new MatTableDataSource(this.elementsService.getElements());
  };


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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
