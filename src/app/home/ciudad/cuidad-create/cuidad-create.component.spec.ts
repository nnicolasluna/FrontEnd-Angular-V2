import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadCreateComponent } from './cuidad-create.component';

describe('CuidadCreateComponent', () => {
  let component: CuidadCreateComponent;
  let fixture: ComponentFixture<CuidadCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuidadCreateComponent]
    });
    fixture = TestBed.createComponent(CuidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
