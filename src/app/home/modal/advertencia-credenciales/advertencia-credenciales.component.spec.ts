import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaCredencialesComponent } from './advertencia-credenciales.component';

describe('AdvertenciaCredencialesComponent', () => {
  let component: AdvertenciaCredencialesComponent;
  let fixture: ComponentFixture<AdvertenciaCredencialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertenciaCredencialesComponent]
    });
    fixture = TestBed.createComponent(AdvertenciaCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
