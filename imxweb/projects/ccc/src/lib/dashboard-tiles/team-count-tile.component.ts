import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService, QerApiService, QerPermissionsService } from 'qer';

@Component({
  templateUrl: './team-count-tile.component.html',
  standalone: false,
})
export class TeamCountTileComponent implements OnInit {
  public reportCount = 0;

  constructor(
    private readonly router: Router,
    private readonly dashboardService: DashboardService,
    private readonly qerApi: QerApiService,
    private readonly qerPermissions: QerPermissionsService,
  ) {}

  public async ngOnInit(): Promise<void> {
    // Tell the start page we are loading, so it keeps its busy indicator until we are done
    const busy = this.dashboardService.beginBusy();
    try {
      if (await this.qerPermissions.isPersonManager()) {
        // PageSize -1 returns only the total count, not the records
        const result = await this.qerApi.typedClient.PortalPersonReports.Get({ PageSize: -1 });
        this.reportCount = result.totalCount;
      }
    } finally {
      busy.endBusy();
    }
  }

  public goToMyTeam(): void {
    this.router.navigate(['resp', 'identities']);
  }
}
