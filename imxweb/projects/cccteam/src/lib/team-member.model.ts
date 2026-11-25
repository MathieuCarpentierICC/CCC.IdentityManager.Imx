/** One identity that reports to the logged-in manager, reduced to what our UI needs. */
export interface TeamMember {
  uid: string;
  displayName: string;
  email: string;
  isInactive: boolean;
  isExternal: boolean;
}
