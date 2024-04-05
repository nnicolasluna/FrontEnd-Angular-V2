import { Component, Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-custom-paginator-intl',
  templateUrl: './my-custom-paginator-intl.component.html',
  styleUrls: ['./my-custom-paginator-intl.component.scss']
})
@Injectable()
export class MyCustomPaginatorIntlComponent implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = `Primera pagina`;
  itemsPerPageLabel = `Registros por pagina:`;
  lastPageLabel = `Ultima pagina`;
  nextPageLabel = 'Pagina siguientr';
  previousPageLabel = 'Pagina anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Pagina 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} de ${amountPages}`;
  }
}
