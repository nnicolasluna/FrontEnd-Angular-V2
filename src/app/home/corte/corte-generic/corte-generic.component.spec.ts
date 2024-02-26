import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteGenericComponent } from './corte-generic.component';

describe('CorteGenericComponent', () => {
  let component: CorteGenericComponent;
  let fixture: ComponentFixture<CorteGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorteGenericComponent]
    });
    fixture = TestBed.createComponent(CorteGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
