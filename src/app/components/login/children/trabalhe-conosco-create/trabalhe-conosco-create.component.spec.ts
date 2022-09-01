import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalheConoscoCreateComponent } from './trabalhe-conosco-create.component';

describe('TrabalheConoscoCreateComponent', () => {
  let component: TrabalheConoscoCreateComponent;
  let fixture: ComponentFixture<TrabalheConoscoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabalheConoscoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabalheConoscoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
