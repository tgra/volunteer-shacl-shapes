import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";
import { VolunteerOrganisation } from './VolunteerOrganisation.js';
import { VolunteerRole } from './VolunteerRole.js';
import { VolunteerSession } from './VolunteerSession.js';

export class VolunteerActivity extends TermWrapper {

  get activityRequiresEmergencyParticipation(): Set<boolean> {
    return this.objects("https://ns.volunteeringdata.io/activityRequiresEmergencyParticipation", ValueMapping.literalToBoolean, TermMapping.booleanToLiteral);
  }

  get activityHasTitle(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/activityTitle", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get activityHasRole(): Set<VolunteerRole> {
    return this.objects("https://ns.volunteeringdata.io/activityRole", ObjectMapping.as(VolunteerRole), ObjectMapping.as(VolunteerRole));
  }

  get activityHasDescription(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/activityDescription", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get activityHasSession(): Set<VolunteerSession> {
    return this.objects("https://ns.volunteeringdata.io/activitySession", ObjectMapping.as(VolunteerSession), ObjectMapping.as(VolunteerSession));
  }

  get activityHasImage(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/activityImage", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get activityHasOrganisation(): Set<VolunteerOrganisation> {
    return this.objects("https://ns.volunteeringdata.io/activityOrganisation", ObjectMapping.as(VolunteerOrganisation), ObjectMapping.as(VolunteerOrganisation));
  }
}
