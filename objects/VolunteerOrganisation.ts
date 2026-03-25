import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";
import { VolunteerActivity } from './VolunteerActivity.js';
import { VolunteerCause } from './VolunteerCause.js';

export class VolunteerOrganisation extends TermWrapper {

  get organisationHasCharityNumber(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationCharityNumber", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get organisationHasName(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationName", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get organisationHasActivity(): Set<VolunteerActivity> {
    return this.objects("https://ns.volunteeringdata.io/organisationActivity", ObjectMapping.as(VolunteerActivity), ObjectMapping.as(VolunteerActivity));
  }

  get organisationHasDescription(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationDescription", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get organisationHasCharitableCause(): Set<VolunteerCause> {
    return this.objects("https://ns.volunteeringdata.io/organisationCause", ObjectMapping.as(VolunteerCause), ObjectMapping.as(VolunteerCause));
  }

  get organisationHasImage(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationImage", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get organisationHasWebsite(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/organisationWebsite", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
