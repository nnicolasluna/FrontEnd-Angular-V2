import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoEditComponent } from './foto-edit.component';

describe('FotoEditComponent', () => {
  let component: FotoEditComponent;
  let fixture: ComponentFixture<FotoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotoEditComponent]
    });
    fixture = TestBed.createComponent(FotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
