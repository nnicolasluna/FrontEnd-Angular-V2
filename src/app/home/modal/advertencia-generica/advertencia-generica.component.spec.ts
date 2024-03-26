import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaGenericaComponent } from './advertencia-generica.component';

describe('AdvertenciaGenericaComponent', () => {
  let component: AdvertenciaGenericaComponent;
  let fixture: ComponentFixture<AdvertenciaGenericaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertenciaGenericaComponent]
    });
    fixture = TestBed.createComponent(AdvertenciaGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
