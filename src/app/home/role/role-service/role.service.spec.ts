import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleService } from './role.service';

describe('Servicios de Rol', () => {
  let service: RoleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService]
    });
    service = TestBed.inject(RoleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('Creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca roles desde la API via GET', () => {
    const mockRol = [
      {
        nombre: 'ADMINISTRADOR',
        descripcion: 'Descripción del administrador',
        estado: true,
      },
      {
        nombre: 'USUARIO',
        descripcion: 'Descripción del usuario',
        estado: true,
      }
    ];
    service.getRoles().subscribe(roles => {
      expect(roles).toEqual(mockRol);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockRol);
  });

  it('Busca rol por UUID via GET', () => {
    const uuid = '123';
    const mockRol = 
    {
      nombre: 'ADMINISTRADOR',
      descripcion: 'Descripción del administrador',
      estado: true,
    }
    service.getRol(uuid).subscribe(rol => {
      expect(rol).toEqual(mockRol);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRol);
  });
  
  it('Crea rol via POST', () => {
    const mockRol = 
    {
      nombre: 'ADMINISTRADOR',
      descripcion: 'Descripción del administrador',
      estado: true,
    }

    service.create(mockRol).subscribe(response => {
      expect(response).toEqual(mockRol);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockRol);
  });

  it('Actualiza rol via PUT', () => {
    const uuid = '123';
    const updatedRol = 
    {
      nombre: 'ADMINISTRADORR',
      descripcion: 'Descripción del administrador',
      estado: true,
    }

    service.update(uuid, updatedRol).subscribe(response => {
      expect(response).toEqual(updatedRol);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedRol);
  });

});