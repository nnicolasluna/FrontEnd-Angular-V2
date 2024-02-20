import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { user } from '../user-model/user';
import { roleDTO } from '../../role/role-model/role';

describe('User Service', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('Creando...', () => {
    expect(service).toBeTruthy();
  });

  it('Busca roles desde la API via GET', () => {
    const mockRoles = [
      {
        Uuid: '1',
        nombre: 'Admin',
        descripcion: 'Administrador',
        estado: true
      },
      {
        Uuid: '2',
        nombre: 'User',
        descripcion: 'Usuario',
        estado: true
      }
    ];

    service.getRoles().subscribe(roles => {
      expect(roles).toEqual(mockRoles);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockRoles);
  });

  it('Busca rol por UUID via GET', () => {
    const mockRole: roleDTO = {
      Uuid: '333',
      nombre: 'Administrator',
      descripcion: 'Admin role',
      estado: true
    };
    const uuid = '333';

    service.getRole(uuid).subscribe(role => {
      expect(role).toEqual(mockRole);
    });

    const req = httpTestingController.expectOne(`${service['url']}/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRole);
  });

  it('Crear usuario via POST', () => {
    const mockUser: user = { 
      usuario: 'john_doe',
      password: 'password123',
      correoCorporativo: 'john.doe@corporation.com',
      correoPersonal: 'john.doe@gmail.com',
      estado: true,
      personaUuid: 'somePersonUUID',
     };

    service.create(mockUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('Busca persona por UUID via GET', () => {
    const mockPerson = { 
      uuid: 'somePersonUUID',
      nombres: 'John',
      primer_apellido: 'Doe',
      segundo_apellido: 'Smith',
      estado_civil: 'Soltero',
      fecha_nacimiento: '1990-01-01',
      lugar_nacimiento: 'Ciudad',
      genero: 'Masculino',
      ocupacion: 'Profesional',
      celular: '123456789'
     };
    const uuid = 'somePersonUUID';

    service.getPerson(uuid).subscribe(person => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpTestingController.expectOne(`${service['url']}/persona/${uuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPerson);
  });
});