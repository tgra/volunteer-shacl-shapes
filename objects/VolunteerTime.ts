import { TermWrapper, ObjectMapping } from "rdfjs-wrapper";
import { VolunteerSession } from './VolunteerSession.js';

export class VolunteerTime extends TermWrapper {

  get timeHasSession(): Set<VolunteerSession> {
    return this.objects("https://ns.volunteeringdata.io/timeSession", ObjectMapping.as(VolunteerSession), ObjectMapping.as(VolunteerSession));
  }
}
