import { Component } from '@angular/core';
import { ElementsService } from '../../services/elements.service';
import { PeriodicElement } from '../../models/element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, NgFor],
  templateUrl: './elements-table.component.html',
  styleUrl: './elements-table.component.scss'
})
export class ElementsTableComponent {
  public dataSource: MatTableDataSource<PeriodicElement>;
  public columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol'];
  public inputControl = new FormControl();

  constructor(private elementsService: ElementsService) {
    this.dataSource = new MatTableDataSource(this.elementsService.getElements());
    this.inputControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((value: string) => {
        this.applyFilter(value);
      });
  };

  getColumnName(column: string): string {
    switch (column) {
      case 'position': return 'Number';
      case 'name': return 'Name';
      case 'weight': return 'Weight';
      case 'symbol': return 'Symbol';
      default: return "";
    }
  };

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
};
