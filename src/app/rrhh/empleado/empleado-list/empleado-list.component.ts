import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../empleado';
import { AdvertenciaBorrarComponent } from 'src/app/home/modal/advertencia-borrar/advertencia-borrar.component';
import { ModalService } from 'src/app/home/modal/service/modal.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.scss']
})
export class EmpleadoListComponent implements OnInit{

  empleados: Empleado[] = [];
  totalEmpleados: number = 0;
  currentPage = 0;
  pageSize = 10;
  displayedColumns: string[] = ['nombres', 'primer_apellido', 'segundo_apellido', 'cargo', 'area', 'estado', 'action'];
  link_editar = '/home/rrhh/empleado-edit';
  link_ver= '/home/rrhh/empleado-profile'
  matDialogRef: any;
  dataSource = new MatTableDataSource<Empleado>(this.empleados);
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private empleadoService: EmpleadoService,
    private modalService: ModalService,
    ) { }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadoService.getEmpleados(this.currentPage, this.pageSize)
    .subscribe(empleados => {
      this.empleados = empleados;
      this.dataSource.data = this.empleados; 
      this.dataSource.paginator = this.paginator; 
    }, error => {
      console.error('Error al obtener empleados:', error);
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Aplicar el filtro a los datos
    this.dataSource.filterPredicate = (data:any, filter: string) => {
      const searchString = data.persona.nombres.toLowerCase() + ' ' +
                           data.persona.primer_apellido.toLowerCase() + ' ' +
                           data.persona.segundo_apellido.toLowerCase() + ' ' +
                           (data.cargos ? data.cargos.nombre.toLowerCase() : '') + ' ' +
                           (data.areas ? data.areas.nombre.toLowerCase() : '');  
      return searchString.includes(filter);
    };
  
    this.dataSource.filter = filterValue;
  }
  

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmpleados();
  }

  getColumnHeader(column: string): string {
    switch (column) {
      case 'nombres':
        return 'Nombres';
      case 'primer_apellido':
        return 'Primer Apellido';
      case 'segundo_apellido':
        return 'Segundo Apellido';
      case 'cargo':
        return 'Cargo';
      case 'area':
        return 'Área';
      case 'estado':
        return 'Estado';
      default:
        return '';
    }
  }

  getCellValue(column: string, empleado: any): string {
    switch (column) {
      case 'nombres':
        return empleado.persona.nombres;
      case 'primer_apellido':
        return empleado.persona.primer_apellido;
      case 'segundo_apellido':
        return empleado.persona.segundo_apellido;
      case 'cargo':
        return empleado.cargos.nombre;
      case 'area':
        return empleado.areas.nombre;
      case 'estado':
        return empleado.estado ? 'Activo' : 'Inactivo';
      default:
        return '';
    }
  }
  disable(uuid: string): void {
    this.empleadoService.editarEstado(uuid).subscribe(
      (empleado) => {
        console.log('Empleado desactivado:', empleado);
        this.loadEmpleados(); 
      },
      (error) => {
        console.error('Error al desactivar el empleado:', error);
      }
    );
  }
  delete(uuid: string) {
    this.matDialogRef = this.modalService.openDialog(AdvertenciaBorrarComponent);
    this.matDialogRef.afterClosed().subscribe(
      () => {
        if (this.matDialogRef.componentInstance.confirmado) {
          this.empleadoService.deleteEmpleado(uuid).subscribe(
            () => {
              this.loadEmpleados();
            },
            error => {
              console.log('No se puede eliminar este registro');
            }
          );
        }
      }
    );
  }
  
}
