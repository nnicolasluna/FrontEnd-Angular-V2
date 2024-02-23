import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadListComponent } from './cuidad-list.component';

describe('CuidadListComponent', () => {
  let component: CuidadListComponent;
  let fixture: ComponentFixture<CuidadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuidadListComponent]
    });
    fixture = TestBed.createComponent(CuidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
