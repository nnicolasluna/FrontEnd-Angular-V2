import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';

describe('Persona Service', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PersonService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca personas desde la API via GET', () => {
    const mockPeople = [
      { 
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
      {
        nombres: 'Juan',
        primer_apellido: 'Zarrate',
        segundo_apellido: 'Carrazco',
        estado_civil: 'Soltero',
        fecha_nacimiento: '10/11/1999',
        lugar_nacimiento: 'La Paz',
        genero: 'Masculino',
        ocupacion: 'Tecnico',
        celular: '7777777'
      }
    ];

    service.getPeople().subscribe(people => {
      expect(people).toEqual(mockPeople);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockPeople);
  });

  it('Buscar persona por UUID via GET', () => {
    const uuid = '123';
    const mockPerson = { 
      nombres: 'Rosita',
      primer_apellido: 'Davila',
      segundo_apellido: 'Montes',
      estado_civil: 'Casada',
      fecha_nacimiento: '05/11/1999',
      lugar_nacimiento: 'La Paz',
      genero: 'Femenino',
      ocupacion: 'Doctora',
      celular: '78787878'
     };

    service.getPerson(uuid).subscribe(person => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPerson);
  });

  it('Crear persona via POST', () => {
    const mockPerson = 
    { 
      nombres: 'Rosita',
      primer_apellido: 'Davila',
      segundo_apellido: 'Montes',
      estado_civil: 'Casada',
      fecha_nacimiento: '05/11/1999',
      lugar_nacimiento: 'La Paz',
      genero: 'Femenino',
      ocupacion: 'Doctora',
      celular: '78787878'
    };

    service.create(mockPerson).subscribe(response => {
      expect(response).toEqual(mockPerson);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(mockPerson);
  });

  it('Eliminar persona por UUID via DELETE', () => {
    const uuid = '123';

    service.destroy(uuid).subscribe();

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('Buscar y actualizar persona por UUID via PUT', () => {
    const uuid = '123';
    const updatedPerson = 
    { 
      nombres: 'Rosita',
      primer_apellido: 'Davila',
      segundo_apellido: 'Montes',
      estado_civil: 'Casada',
      fecha_nacimiento: '05/11/1999',
      lugar_nacimiento: 'La Paz',
      genero: 'Femenino',
      ocupacion: 'Doctora',
      celular: '78787878'
     };

    service.update(updatedPerson, uuid).subscribe(response => {
      expect(response).toEqual(updatedPerson);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPerson);
  });

  /*it('Busca documentos por persona por UUID via GET', () => {
    const uuid = '123';
    const mockDocuments = [
      {
        numero: '12121212',
        lugar_emision: 'TR',
        personas: '123'
      
      }
    ];

    service.getDocuments(uuid).subscribe(documents => {
      expect(documents).toEqual(mockDocuments);
    });

    const req = httpTestingController.expectOne(`${service['url']}/personas/${uuid}/documentos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDocuments);
  });*/
});