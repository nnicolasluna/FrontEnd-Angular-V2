import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuService } from './menu.service';

describe('Menu Service', () => {
  let httpTestingController: HttpTestingController;
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MenuService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MenuService);
  });
  
  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('Creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca menus desde la API via GET', () => {
    const mockMenu = [
      {
        nombre: 'caja',
        descripcion: 'menu de caja',
        link: '/cajas',
        icono: 'caja.png',
        estado: true,
        subsistemas: 
          { 
            uuid: '2', 
            nombre: 'Subsistema 2', 
            descripcion: 'Descripción del subsistema 2', 
            link: '/subsistema2', 
            icono: 'icono2',
            estado: true
          }
      },
      {
        nombre: 'remesas',
        descripcion: 'menu de remesas',
        link: '/remesas',
        icono: 'remesas.png',
        estado: true,
        subsistemas:
          { 
            uuid: '1', 
            nombre: 'Subsistema 1', 
            descripcion: 'Descripción del subsistema 1', 
            link: '/subsistema1', 
            icono: 'icono1',
            estado: true
          }
      }
    ];
    service.getMenus().subscribe(menus => {
      expect(menus).toEqual(mockMenu);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockMenu);
  });

  it('Busca menu por UUID via GET', () => {
    const uuid = '123';
    const mockMenu = 
    {
      nombre: 'remesas',
      descripcion: 'menu de remesas',
      link: '/remesas',
      icono: 'remesas.png',
      estado: true,
      subsistemas:
        { 
          uuid: '1', 
          nombre: 'Subsistema 1', 
          descripcion: 'Descripción del subsistema 1', 
          link: '/subsistema1', 
          icono: 'icono1',
          estado: true
        }
    }
    service.getmenu(uuid).subscribe(menu => {
      expect(menu).toEqual(mockMenu);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMenu);
  });
  
  it('Crea menu via POST', () => {
    const mockMenu = 
    {
      nombre: 'remesas',
      descripcion: 'menu de remesas',
      link: '/remesas',
      icono: 'remesas.png',
      estado: true,
      subsistemas:
        { 
          uuid: '1', 
          nombre: 'Subsistema 1', 
          descripcion: 'Descripción del subsistema 1', 
          link: '/subsistema1', 
          icono: 'icono1',
          estado: true
        }
    }
    service.create(mockMenu).subscribe(response => {
      expect(response).toEqual(mockMenu);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockMenu);
  });

  it('Actualiza menu via PUT', () => {
    const uuid = '123';
    const updatedMenu = 
    {
      nombre: 'caja',
      descripcion: 'menu de caja',
      link: '/cajas',
      icono: 'caja.png',
      estado: true,
      subsistemas: 
      {
        uuid: 'uuid1',
        nombre: 'Operaciones',
        descripcion: 'Subsistema encargado de gestionar las transacciones de ventas y facturación.',
        link: 'https://www.modulo-ventas.com',
        icono: 'operaciones.png',
        estado: true
      }
    }

    service.update(updatedMenu, uuid).subscribe(response => {
      expect(response).toEqual(updatedMenu);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMenu);
  });

});