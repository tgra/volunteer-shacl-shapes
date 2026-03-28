import { TermWrapper, LiteralAs, LiteralFrom, TermAs, TermFrom } from "@rdfjs/wrapper";
import { VolunteerActivity } from './VolunteerActivity.js';
import { VolunteerCause } from './VolunteerCause.js';

export class VolunteerOrganisation extends TermWrapper {

  get organisationHasCharityNumber(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationCharityNumber", LiteralAs.string, LiteralFrom.string);
  }

  get organisationHasName(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationName", LiteralAs.string, LiteralFrom.string);
  }

  get organisationHasActivity(): Set<VolunteerActivity> {
    return this.objects("https://ns.volunteeringdata.io/organisationActivity", TermAs.instance(VolunteerActivity), TermFrom.instance);
  }

  get organisationHasDescription(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationDescription", LiteralAs.string, LiteralFrom.string);
  }

  get organisationHasCharitableCause(): Set<VolunteerCause> {
    return this.objects("https://ns.volunteeringdata.io/organisationCause", TermAs.instance(VolunteerCause), TermFrom.instance);
  }

  get organisationHasImage(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationImage", LiteralAs.string, LiteralFrom.string);
  }

  get organisationHasWebsite(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationWebsite", LiteralAs.string, LiteralFrom.string);
  }
}
