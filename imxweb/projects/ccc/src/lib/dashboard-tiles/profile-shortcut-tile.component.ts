import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile-shortcut-tile.component.html',
  standalone: false,
})
export class ProfileShortcutTileComponent {
  constructor(private readonly router: Router) {}

  public goToProfile(): void {
    this.router.navigate(['profile']);
  }
}
