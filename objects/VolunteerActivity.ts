import { TermWrapper, LiteralAs, LiteralFrom, TermAs, TermFrom } from "@rdfjs/wrapper";
import { VolunteerOrganisation } from './VolunteerOrganisation.js';
import { VolunteerRole } from './VolunteerRole.js';
import { VolunteerSession } from './VolunteerSession.js';

export class VolunteerActivity extends TermWrapper {

  get activityRequiresEmergencyParticipation(): Set<boolean> {
    return this.objects("https://ns.volunteeringdata.io/activityRequiresEmergencyParticipation", LiteralAs.boolean, LiteralFrom.boolean);
  }

  get activityHasTitle(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/activityTitle", LiteralAs.string, LiteralFrom.string);
  }

  get activityHasRole(): Set<VolunteerRole> {
    return this.objects("https://ns.volunteeringdata.io/activityRole", TermAs.instance(VolunteerRole), TermFrom.instance);
  }

  get activityHasDescription(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/activityDescription", LiteralAs.string, LiteralFrom.string);
  }

  get activityHasSession(): Set<VolunteerSession> {
    return this.objects("https://ns.volunteeringdata.io/activitySession", TermAs.instance(VolunteerSession), TermFrom.instance);
  }

  get activityHasImage(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/activityImage", LiteralAs.string, LiteralFrom.string);
  }

  get activityHasOrganisation(): Set<VolunteerOrganisation> {
    return this.objects("https://ns.volunteeringdata.io/activityOrganisation", TermAs.instance(VolunteerOrganisation), TermFrom.instance);
  }
}
