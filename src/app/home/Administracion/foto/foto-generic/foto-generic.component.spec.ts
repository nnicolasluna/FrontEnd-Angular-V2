import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoGenericComponent } from './foto-generic.component';

describe('FotoGenericComponent', () => {
  let component: FotoGenericComponent;
  let fixture: ComponentFixture<FotoGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotoGenericComponent]
    });
    fixture = TestBed.createComponent(FotoGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
