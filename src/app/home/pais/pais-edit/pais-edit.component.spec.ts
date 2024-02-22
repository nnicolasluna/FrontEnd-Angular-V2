import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisEditComponent } from './pais-edit.component';

describe('PaisEditComponent', () => {
  let component: PaisEditComponent;
  let fixture: ComponentFixture<PaisEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisEditComponent]
    });
    fixture = TestBed.createComponent(PaisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
