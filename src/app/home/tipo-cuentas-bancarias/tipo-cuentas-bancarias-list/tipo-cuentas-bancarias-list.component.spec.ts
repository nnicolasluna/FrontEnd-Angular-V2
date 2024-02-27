import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentasBancariasListComponent } from './tipo-cuentas-bancarias-list.component';

describe('TipoCuentasBancariasListComponent', () => {
  let component: TipoCuentasBancariasListComponent;
  let fixture: ComponentFixture<TipoCuentasBancariasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCuentasBancariasListComponent]
    });
    fixture = TestBed.createComponent(TipoCuentasBancariasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
