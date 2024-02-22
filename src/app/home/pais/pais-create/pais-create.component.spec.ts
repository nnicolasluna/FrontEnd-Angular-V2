import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisCreateComponent } from './pais-create.component';

describe('PaisCreateComponent', () => {
  let component: PaisCreateComponent;
  let fixture: ComponentFixture<PaisCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaisCreateComponent]
    });
    fixture = TestBed.createComponent(PaisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
