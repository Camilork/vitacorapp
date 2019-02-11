import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercreatorComponent } from './usercreator.component';

describe('UsercreatorComponent', () => {
  let component: UsercreatorComponent;
  let fixture: ComponentFixture<UsercreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
