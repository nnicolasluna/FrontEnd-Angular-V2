import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComandoService } from './comando.service';

describe('Comando Service', () => {
  let httpTestingController: HttpTestingController;
  let service: ComandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComandoService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ComandoService);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('Creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca comandos desde la API via GET', () => {
    const mockComandos = [
      {
        nombre: 'abrir caja',
        descripcion: 'descripcion de comando para abrir caja',
        link: '/abrir-caja',
        icono: 'caja.png',
        estado: true,
        menus: 
          { 
            uuid: '2', 
            nombre: 'Subsistema 2', 
            descripcion: 'Descripción del subsistema 2', 
            link: '/subsistema2', 
            icono: 'icono2',
            estado: 'activo'
          }
      },
      {
        nombre: 'registrar remesa',
        descripcion: 'registrar  remesa',
        link: '/registro-remesas',
        icono: 'remesas.png',
        estado: true,
        subsistemas:
          { 
            uuid: '1', 
            nombre: 'Subsistema 1', 
            descripcion: 'Descripción del subsistema 1', 
            link: '/subsistema1', 
            icono: 'icono1',
            estado: 'activo'
          }
      }
    ];
    service.getComands().subscribe(comandos => {
      expect(comandos).toEqual(mockComandos);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockComandos);
  });

  it('Busca comando por UUID via GET', () => {
    const uuid = '123';
    const mockComando = 
    {
      nombre: 'registrar remesas',
      descripcion: 'comando registro de remesa',
      link: '/registrar-remesa',
      icono: 'remesas.png',
      estado: true,
      menus:
        { 
          uuid: '1', 
          nombre: 'Subsistema 1', 
          descripcion: 'Descripción del subsistema 1', 
          link: '/subsistema1', 
          icono: 'icono1',
          estado: 'activo'
        }
    }
    service.getComand(uuid).subscribe(comando => {
      expect(comando).toEqual(mockComando);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComando);
  });
  
  it('Crea comando via POST', () => {
    const mockComando = 
    {
      nombre: 'registrar remesas',
      descripcion: 'comando registro de remesa',
      link: '/registrar-remesa',
      icono: 'remesas.png',
      estado: true,
      menus:
        { 
          uuid: '1', 
          nombre: 'Subsistema 1', 
          descripcion: 'Descripción del subsistema 1', 
          link: '/subsistema1', 
          icono: 'icono1',
          estado: 'activo'
        }
    }
    service.create(mockComando).subscribe(response => {
      expect(response).toEqual(mockComando);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockComando);
  });

  it('Actualiza menu via PUT', () => {
    const uuid = '123';
    const updatedMenu = 
    {
      nombre: 'registrar remesas',
      descripcion: 'comando registro de remesa',
      link: '/registrar-remesa',
      icono: 'remesas.png',
      estado: true,
      menus:
        { 
          uuid: '1', 
          nombre: 'Subsistema 1', 
          descripcion: 'Descripción del subsistema 1', 
          link: '/subsistema1', 
          icono: 'icono1',
          estado: 'activo'
        }
    }

    service.edit(updatedMenu, uuid).subscribe(response => {
      expect(response).toEqual(updatedMenu);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMenu);
  });
});