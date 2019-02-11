import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitacorComponent } from './vitacor.component';

describe('VitacorComponent', () => {
  let component: VitacorComponent;
  let fixture: ComponentFixture<VitacorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitacorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitacorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
