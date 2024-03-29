import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../empleado';

@Component({
  selector: 'app-empleado-profile',
  templateUrl: './empleado-profile.component.html',
  styleUrls: ['./empleado-profile.component.scss']
})
export class EmpleadoProfileComponent implements OnInit {
  empleado!: any;
  empleadoId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.empleadoId = params['uuid']; 
      if (this.empleadoId) { 
        this.empleadoService.findEmpleado(this.empleadoId)
          .subscribe(
            empleado => {
              console.log('Empleado obtenido:', empleado);
              this.empleado = empleado;
            },
            error => {
              console.error('Error al cargar el empleado:', error);
            }
          );
      } else {
        console.error('UUID no encontrado en los parámetros de la ruta.');
      }
    });
  }
}
