import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteListComponent } from './corte-list.component';

describe('CorteListComponent', () => {
  let component: CorteListComponent;
  let fixture: ComponentFixture<CorteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorteListComponent]
    });
    fixture = TestBed.createComponent(CorteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
