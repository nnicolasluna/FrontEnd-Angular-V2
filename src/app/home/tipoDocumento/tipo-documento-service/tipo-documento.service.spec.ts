import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoDocumentoService } from './tipo-documento.service';

describe('TipoDocumentoService', () => {
  let service: TipoDocumentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoDocumentoService] 
    });
    service = TestBed.inject(TipoDocumentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('Creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca tipo de documentos desde la API via GET', () => {
    const mockTipoDocumento = [
      {
        nombres: 'DNI',
        descripcion: 'Descripción del documento de identidad chileno',
        estado: true,
      },
      {
        nombres: 'CI',
        descripcion: 'Descripción del documento de identidad',
        estado: true,
      }
    ];
    service.getDocuments().subscribe(tipoDocumentos => {
      expect(tipoDocumentos).toEqual(mockTipoDocumento);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockTipoDocumento);
  });

  it('Busca tipo de documento por UUID via GET', () => {
    const uuid = '123';
    const mockTipoDocumento = 
      {
        nombres: 'DNI',
        descripcion: 'Descripción del documento de identidad chileno',
        estado: true,
      }
    service.getDocument(uuid).subscribe(tipoDocumentos => {
      expect(tipoDocumentos).toEqual(mockTipoDocumento);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTipoDocumento);
  });
  
  it('Crear tipo de documento via POST', () => {
    const mockTipoDocumento = 
      {
        nombres: 'DNI',
        descripcion: 'Descripción del documento de identidad chileno',
        estado: true,
      }

    service.createTipoDoc(mockTipoDocumento).subscribe(response => {
      expect(response).toEqual(mockTipoDocumento);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockTipoDocumento);
  });

  it('Actualiza tipo de documento via PUT', () => {
    const uuid = '123';
    const updatedTipoDocumento = 
      {
        nombres: 'DNI',
        descripcion: 'Documento de identidad chileno',
        estado: true,
      }

    service.update(updatedTipoDocumento, uuid).subscribe(response => {
      expect(response).toEqual(updatedTipoDocumento);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTipoDocumento);
  });

});