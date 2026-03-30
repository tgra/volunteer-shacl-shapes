import { TermWrapper, LiteralAs, LiteralFrom, TermAs, TermFrom } from "@rdfjs/wrapper";
import { VolunteerSession } from './VolunteerSession.js';

export class VolunteerLocation extends TermWrapper {

  get locationHasAddress(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationAddress", LiteralAs.string, LiteralFrom.string);
  }

  get locationHasLongitude(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationLongitude", LiteralAs.string, LiteralFrom.string);
  }

  get locationHasLatitude(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationLatitude", LiteralAs.string, LiteralFrom.string);
  }

  get locationHasSession(): Set<VolunteerSession> {
    return this.objects("https://ns.volunteeringdata.io/locationSession", TermAs.instance(VolunteerSession), TermFrom.instance);
  }

  get locationHasName(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationName", LiteralAs.string, LiteralFrom.string);
  }

  get locationHasGeometry(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/locationGeometry", LiteralAs.string, LiteralFrom.string);
  }
}
