import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteCreateComponent } from './corte-create.component';

describe('CorteCreateComponent', () => {
  let component: CorteCreateComponent;
  let fixture: ComponentFixture<CorteCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorteCreateComponent]
    });
    fixture = TestBed.createComponent(CorteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
