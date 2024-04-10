import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdataComponent } from './reportdata.component';

describe('ReportdataComponent', () => {
  let component: ReportdataComponent;
  let fixture: ComponentFixture<ReportdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
