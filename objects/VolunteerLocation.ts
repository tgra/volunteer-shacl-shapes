import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";
import { VolunteerSession } from './VolunteerSession.js';

export class VolunteerLocation extends TermWrapper {

  get locationHasAddress(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationAddress", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get locationHasLongitude(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationLongitude", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get locationHasLatitude(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationLatitude", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get locationHasSession(): Set<VolunteerSession> {
    return this.objects("https://ns.volunteeringdata.io/locationSession", ObjectMapping.as(VolunteerSession), ObjectMapping.as(VolunteerSession));
  }

  get locationHasName(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationName", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get locationHasGeometry(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationGeometry", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
