import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { EuiCoreModule } from '@elemental-ui/core';
import { ClassloggerService } from 'qbm';
import { TilesModule } from 'qer';
import { ProfileShortcutTileComponent } from './dashboard-tiles/profile-shortcut-tile.component';
import { TeamCountTileComponent } from './dashboard-tiles/team-count-tile.component';
import { CccInitService } from './init.service';

@NgModule({
  declarations: [ProfileShortcutTileComponent, TeamCountTileComponent],
  imports: [CommonModule, MatButtonModule, TranslateModule, EuiCoreModule, TilesModule],
})
export class CccConfigModule {
  constructor(
    private readonly initializer: CccInitService,
    private readonly logger: ClassloggerService,
  ) {
    this.logger.info(this, '🔥 CCC loaded');
    this.initializer.onInit();
    this.logger.info(this, '▶️ CCC initialized');
  }
}
