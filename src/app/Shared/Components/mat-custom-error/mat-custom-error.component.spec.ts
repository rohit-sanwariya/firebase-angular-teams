import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCustomErrorComponent } from './mat-custom-error.component';

describe('MatCustomErrorComponent', () => {
  let component: MatCustomErrorComponent;
  let fixture: ComponentFixture<MatCustomErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCustomErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatCustomErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
