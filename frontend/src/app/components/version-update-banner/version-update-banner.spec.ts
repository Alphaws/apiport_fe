import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionUpdateBanner } from './version-update-banner';

describe('VersionUpdateBanner', () => {
  let component: VersionUpdateBanner;
  let fixture: ComponentFixture<VersionUpdateBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionUpdateBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionUpdateBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
