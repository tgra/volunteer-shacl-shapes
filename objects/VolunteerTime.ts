import { TermWrapper, TermAs, TermFrom } from "@rdfjs/wrapper";
import { VolunteerSession } from './VolunteerSession.js';

export class VolunteerTime extends TermWrapper {

  get timeHasSession(): Set<VolunteerSession> {
    return this.objects("https://ns.volunteeringdata.io/timeSession", TermAs.instance(VolunteerSession), TermFrom.instance);
  }
}
