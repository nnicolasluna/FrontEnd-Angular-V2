import { ApiService } from './api.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment/environment';

describe('ApiService', () => {
  let service: ApiService<any>; 
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('Verifica si existe', () => {
    expect(service).toBeTruthy();
  });

  it('obtiene todos los registros', () => {
    const testData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

    service.getAll('personas').subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}personas`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('obtiene un registro', () => {
    const testData = { id: 1, name: 'Item 1' };
    const itemId = '1';

    service.getOne('personas', itemId).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}personas/${itemId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('crea un registro', () => {
    const testData = { id: 1, name: 'New Item' };

    service.create('personas', testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}personas`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('edita un registro', () => {
    const testData = { id: 1, name: 'Updated Item' };
    const itemId = '1';

    service.update('personas', itemId, testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}personas/${itemId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(testData);
  });

  it('elimina un registro', () => {
    const itemId = '1';

    service.delete('personas', itemId).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}personas/${itemId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});