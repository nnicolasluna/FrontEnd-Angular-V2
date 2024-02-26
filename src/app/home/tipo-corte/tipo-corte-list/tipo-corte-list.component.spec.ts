import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCorteListComponent } from './tipo-corte-list.component';

describe('TipoCorteListComponent', () => {
  let component: TipoCorteListComponent;
  let fixture: ComponentFixture<TipoCorteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCorteListComponent]
    });
    fixture = TestBed.createComponent(TipoCorteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
