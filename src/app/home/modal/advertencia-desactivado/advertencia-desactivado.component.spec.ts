import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaDesactivadoComponent } from './advertencia-desactivado.component';

describe('AdvertenciaDesactivadoComponent', () => {
  let component: AdvertenciaDesactivadoComponent;
  let fixture: ComponentFixture<AdvertenciaDesactivadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertenciaDesactivadoComponent]
    });
    fixture = TestBed.createComponent(AdvertenciaDesactivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
