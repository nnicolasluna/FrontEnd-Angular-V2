import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacionListComponent } from './ocupacion-list.component';

describe('OcupacionListComponent', () => {
  let component: OcupacionListComponent;
  let fixture: ComponentFixture<OcupacionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcupacionListComponent]
    });
    fixture = TestBed.createComponent(OcupacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
