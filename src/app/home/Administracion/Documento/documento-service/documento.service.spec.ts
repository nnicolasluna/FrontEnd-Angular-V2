import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentoService } from './documento.service';
import { documentoDTO } from '../documento-model/documento';

describe('DocumentoService', () => {
  let service: DocumentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentoService]
    });
    service = TestBed.inject(DocumentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  
  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('Creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca documentos desde la API via GET', () => {
    const mockDocumentos = [
      { 
        uuid: '1', 
        numero: '123', 
        lugar_emision: 'OR', 
        estado: true,
        personas: { 
          uuid: 'uuid1',
          nombres: 'Rosita',
          primer_apellido: 'Davila',
          segundo_apellido: 'Montes',
          estado_civil: 'Casada',
          fecha_nacimiento: '05/11/1999',
          lugar_nacimiento: 'La Paz',
          genero: 'Femenino',
          ocupacion: 'Doctora',
          celular: '78787878'
         },
        tipo_documentoUuid: 'uuid'
      },
      { 
        uuid: '2', 
        numero: '456', 
        lugar_emision: 'LP', 
        estado: true,
        personas: { 
          uuid: 'uuid2',
          nombres: 'Juan',
          primer_apellido: 'Zarrate',
          segundo_apellido: 'Carrazco',
          estado_civil: 'Soltero',
          fecha_nacimiento: '10/11/1999',
          lugar_nacimiento: 'La Paz',
          genero: 'Masculino',
          ocupacion: 'Tecnico',
          celular: '7777777'
          },
        tipo_documentoUuid: 'uuid' 
      }
    ];
    service.getdocumentos().subscribe(documentos => {
      expect(documentos).toEqual(mockDocumentos);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockDocumentos);
  });

  it('Busca documento por UUID via GET', () => {
    const uuid = '123';
    const mockDocumento = 
    { 
      uuid: '1', 
      numero: '123', 
      lugar_emision: 'OR', 
      estado: true,
      personas: { 
        uuid: 'uuid1',
        nombres: 'Rosita',
        primer_apellido: 'Davila',
        segundo_apellido: 'Montes',
        estado_civil: 'Casada',
        fecha_nacimiento: '05/11/1999',
        lugar_nacimiento: 'La Paz',
        genero: 'Femenino',
        ocupacion: 'Doctora',
        celular: '78787878'
       },
      tipo_documentoUuid: 'uuid'
    }
    service.getdocumento(uuid).subscribe(documento => {
      expect(documento).toEqual(mockDocumento);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDocumento);
  });
  
  it('Crea documento via POST', () => {
    const mockDocumento = 
    { 
      uuid: '1', 
      numero: '123', 
      lugar_emision: 'OR', 
      estado: true,
      personas: { 
        uuid: 'uuid1',
        nombres: 'Rosita',
        primer_apellido: 'Davila',
        segundo_apellido: 'Montes',
        estado_civil: 'Casada',
        fecha_nacimiento: '05/11/1999',
        lugar_nacimiento: 'La Paz',
        genero: 'Femenino',
        ocupacion: 'Doctora',
        celular: '78787878'
       },
      tipo_documentoUuid: 'uuid'
    }

    service.create(mockDocumento).subscribe(response => {
      expect(response).toEqual(mockDocumento);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockDocumento);
  });

  it('Actualiza documento via PUT', () => {
    const uuid = '123';
    const updatedDocumento = 
    { 
      uuid: '1', 
      numero: '123', 
      lugar_emision: 'OR', 
      estado: true,
      personas: { 
        uuid: 'uuid1',
        nombres: 'Rosita',
        primer_apellido: 'Davila',
        segundo_apellido: 'Montes',
        estado_civil: 'Casada',
        fecha_nacimiento: '05/11/1999',
        lugar_nacimiento: 'La Paz',
        genero: 'Femenino',
        ocupacion: 'Doctora',
        celular: '78787878'
       },
      tipo_documentoUuid: 'uuid'
    }

    service.update(updatedDocumento, uuid).subscribe(response => {
      expect(response).toEqual(updatedDocumento);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedDocumento);
  });

});