import { Injectable } from '@angular/core';
import { PeriodicElement } from '../models/element.model';
import { RxState } from '@rx-angular/state';

@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  private readonly _state = new RxState<{ elements: PeriodicElement[] }>();
  public elements$ = this._state.select('elements');

  constructor() {
    this._state.set({ elements: this.ELEMENT_DATA });
  }

  private ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  public updateElement(column: string, element: PeriodicElement, newValue: string | number): void {
    this._state.set(({ elements }) => {
      const updatedElements = elements.map((el) =>
        el.position === element.position ? { ...el, [column]: newValue } : el
      );
      return { elements: updatedElements };
    });
  }
}
