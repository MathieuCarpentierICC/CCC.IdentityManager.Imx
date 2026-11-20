import { Injectable } from '@angular/core';

import { ExtService } from 'qbm';
import { ProfileShortcutTileComponent } from './dashboard-tiles/profile-shortcut-tile.component';
import { TeamCountTileComponent } from './dashboard-tiles/team-count-tile.component';

@Injectable({ providedIn: 'root' })
export class CccInitService {
  constructor(private readonly extService: ExtService) {}

  public onInit(): void {
    // Each key matches an <imx-ext id="..."> placeholder on the Web Portal start page
    this.extService.register('Dashboard-SmallTiles', { instance: TeamCountTileComponent });
    this.extService.register('Dashboard-MediumTiles', { instance: ProfileShortcutTileComponent });
  }
}
