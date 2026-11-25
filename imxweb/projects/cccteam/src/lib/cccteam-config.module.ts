import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTeamTileComponent } from './my-team-tile/my-team-tile.component';
import { MyTeamPageComponent } from './my-team-page/my-team-page.component';



@NgModule({
  declarations: [
    MyTeamTileComponent,
    MyTeamPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CccteamConfigModule { }
