import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IGX_LIST_DIRECTIVES } from '@infragistics/igniteui-angular';
import { RevealSdkSettings, RevealViewOptions } from '@revealbi/ui';
import { Subject, takeUntil } from 'rxjs';
import { DashboardNames } from '../models/acme-analytics-server/dashboard-names';
import { AcmeAnalyticsServerService } from '../services/acme-analytics-server.service';

@Component({
  selector: 'app-view1',
  imports: [IGX_LIST_DIRECTIVES],
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class View1Component implements OnInit, OnDestroy {
  dashboardOptions: RevealViewOptions = {
    visualizations: {
      menu: {
        copy: false,
        duplicate: false
      }
    }
  };

  private destroy$: Subject<void> = new Subject<void>();
  public db?: string;
  public acmeAnalyticsServerDashboardNames: DashboardNames[] = [];

  constructor(private acmeAnalyticsServerService: AcmeAnalyticsServerService) {
    RevealSdkSettings.serverUrl = 'https://acmeanalyticsserver.azurewebsites.net/';
  }

  ngOnInit() {
    this.acmeAnalyticsServerService.getDashboardNamesList().pipe(takeUntil(this.destroy$)).subscribe(data => this.acmeAnalyticsServerDashboardNames = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public listItemClick(item: DashboardNames) {
    this.db = item.dashboardFileName;
  }
}
