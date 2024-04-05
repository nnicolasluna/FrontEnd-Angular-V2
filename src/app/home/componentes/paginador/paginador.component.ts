import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../../service/api-generico/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() hidePageSize!: boolean;
  @Input() pageIndex!: number;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  pageEvent!: PageEvent;
  private url_personas = 'administracion/personas/paginado'
  personas: any;
  personas_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    private apiService: ApiService<any>,
  ) { }
  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.length = e.length;
    this.pageIndex = e.pageIndex;
    this.changePage(e.pageIndex);

  }
  changePage(pageNumber: number) {

    this.apiService.getAllpageable(this.url_personas, pageNumber.toString(), String(this.pageSize)).subscribe({
      next: (data) => {
        this.personas = data;
        /* console.log(data) */
        this.personas_dataSource.data = this.personas.content;
      },
      error: error => {
        console.log('gaaa')
        console.log(error);
      }
    });
  }
}
