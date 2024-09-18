import { Component, inject } from '@angular/core';
import { ElementsService } from '../../services/elements.service';
import { PeriodicElement } from '../../models/element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

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
  public filterControl = new FormControl();
  readonly dialog = inject(MatDialog);

  constructor(private elementsService: ElementsService) {
    this.dataSource = new MatTableDataSource(this.elementsService.getElements());
    this.filterControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((value: string) => {
        this.applyFilter(value);
      });
  };

  public getColumnName(column: string): string {
    switch (column) {
      case 'position': return 'Number';
      case 'name': return 'Name';
      case 'weight': return 'Weight';
      case 'symbol': return 'Symbol';
      default: return "";
    }
  };

  private applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  public openEditDialog(column: string, element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { column, element }
    });

    dialogRef.afterClosed().subscribe(value => {
      value && this.elementsService.updateElement(column, element, value)
    });
  }
};
