import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaDeshabilitarComponent } from './advertencia-deshabilitar.component';

describe('AdvertenciaDeshabilitarComponent', () => {
  let component: AdvertenciaDeshabilitarComponent;
  let fixture: ComponentFixture<AdvertenciaDeshabilitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertenciaDeshabilitarComponent]
    });
    fixture = TestBed.createComponent(AdvertenciaDeshabilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
