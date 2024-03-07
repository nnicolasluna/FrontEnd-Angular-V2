import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubsistemaService } from './subsistema.service';

describe('Subsistema Service', () => {
  let service: SubsistemaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubsistemaService]
    });
    service = TestBed.inject(SubsistemaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('creando...', () => {
     expect(service).toBeTruthy(); 
  });

  it('Busca subsistemas desde la API via GET', () => {
    const mockSubsistema = [
      {
        nombre: 'Operaciones',
        descripcion: 'Subsistema encargado de gestionar las transacciones de ventas y facturación.',
        link: 'https://www.modulo-ventas.com',
        icono: 'operaciones.png'
      },
      {
        nombre: 'Contabilidad',
        descripcion: 'Subsistema encargado de gestionar la contabilidad.',
        link: 'https://www.modulo-contabilidad.com',
        icono: 'conta.png'
      }
    ];
    service.getSubsis().subscribe(subsistemas => {
      expect(subsistemas).toEqual(mockSubsistema);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubsistema);
  });

  it('Busca subsistema por UUID via GET', () => {
    const uuid = '123';
    const mockSubsistema = 
      {
        nombre: 'Operaciones',
        descripcion: 'Subsistema encargado de gestionar las transacciones de ventas y facturación.',
        link: 'https://www.modulo-ventas.com',
        icono: 'operaciones.png'
      }
    service.getSub(uuid).subscribe(subsistemas => {
      expect(subsistemas).toEqual(mockSubsistema);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubsistema);
  });

  it('Crear subsistema via POST', () => {
    const mockSubsistema = 
      {
        nombre: 'Operaciones',
        descripcion: 'Subsistema encargado de gestionar las transacciones de ventas y facturación.',
        link: 'https://www.modulo-ventas.com',
        icono: 'operaciones.png',
        estado: true
      }

    service.create(mockSubsistema).subscribe(response => {
      expect(response).toEqual(mockSubsistema);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockSubsistema);
  });

  it('Actualiza subsistema via PUT', () => {
    const uuid = '123';
    const updatedSubsistema = 
      {
        nombre: 'Operacion',
        descripcion: 'Subsistema encargado de gestionar las transacciones de ventas y facturación.',
        link: 'https://www.modulo-ventas.com',
        icono: 'operaciones.png',
        estado: true
      }

    service.update(uuid, updatedSubsistema).subscribe(response => {
      expect(response).toEqual(updatedSubsistema);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSubsistema);
  });

});