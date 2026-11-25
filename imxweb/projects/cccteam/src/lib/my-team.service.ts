import { computed, inject, Injectable, signal } from '@angular/core';
import { PortalPersonReports } from '@imx-modules/imx-api-qer';
import { ClassloggerService } from 'qbm';
import { QerApiService } from 'qer';
import { TeamMember } from './team-member.model';

/**
 * Single source of truth for "my team" data.
 * providedIn: 'root' => one instance for the whole portal, shared by every component that injects it.
 */
@Injectable({
  providedIn: 'root',
})
export class MyTeamService {
  // Dependencies, injected by Angular
  private readonly qerApi = inject(QerApiService);
  private readonly logger = inject(ClassloggerService);

  // Private, writable state: only this service may change it
  private readonly membersState = signal<TeamMember[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  // Public, read-only view of the state
  public readonly members = this.membersState.asReadonly();
  public readonly loading = this.loadingState.asReadonly();
  public readonly error = this.errorState.asReadonly();

  // Derived values, recomputed automatically when membersState changes
  public readonly count = computed(() => this.membersState().length);
  public readonly inactiveCount = computed(() => this.membersState().filter((m) => m.isInactive).length);
  public readonly externalCount = computed(() => this.membersState().filter((m) => m.isExternal).length);

  // Cache: the request in progress or already completed
  private loadRequest: Promise<void> | null = null;

  /** Loads the team once. Later calls reuse the same request, so the API Server is called only once. */
  public load(): Promise<void> {
    if (!this.loadRequest) {
      this.loadRequest = this.fetchTeam();
    }
    return this.loadRequest;
  }

  /** Forgets the cache and loads again from the API Server. */
  public refresh(): Promise<void> {
    this.loadRequest = null;
    return this.load();
  }

  private async fetchTeam(): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);
    try {
      const result = await this.qerApi.typedClient.PortalPersonReports.Get({
        OnlyDirect: true,
        StartIndex: 0,
        PageSize: 500,
      });
      this.membersState.set(result.Data.map((person) => this.toTeamMember(person)));
      this.logger.debug(this, `Loaded ${result.Data.length} team member(s)`);
    } catch (e) {
      this.logger.error(this, 'Loading team failed', e);
      this.errorState.set('Your team could not be loaded.');
      this.loadRequest = null; // allow a retry on the next load()
    } finally {
      this.loadingState.set(false);
    }
  }

  /** Converts an API entity into our plain TeamMember object. */
  private toTeamMember(person: PortalPersonReports): TeamMember {
    const entity = person.GetEntity();
    return {
      uid: entity.GetKeys()[0],
      displayName: entity.GetDisplay(),
      email: person.DefaultEmailAddress.value,
      isInactive: person.IsInActive.value,
      isExternal: person.IsExternal.value,
    };
  }
}
