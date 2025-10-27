import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionUpdateBannerComponent } from './version-update-banner.component';

describe('VersionUpdateBannerComponent', () => {
  let component: VersionUpdateBannerComponent;
  let fixture: ComponentFixture<VersionUpdateBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionUpdateBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionUpdateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
