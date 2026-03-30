import { TermWrapper, TermAs, TermFrom } from "@rdfjs/wrapper";
import { VolunteerActivity } from './VolunteerActivity.js';
import { VolunteerLocation } from './VolunteerLocation.js';
import { VolunteerTime } from './VolunteerTime.js';

export class VolunteerSession extends TermWrapper {

  get sessionHasActivity(): Set<VolunteerActivity> {
    return this.objects("https://ns.volunteeringdata.io/sessionActivity", TermAs.instance(VolunteerActivity), TermFrom.instance);
  }

  get sessionHasTime(): Set<VolunteerTime> {
    return this.objects("https://ns.volunteeringdata.io/sessionTime", TermAs.instance(VolunteerTime), TermFrom.instance);
  }

  get sessionHasLocation(): Set<VolunteerLocation> {
    return this.objects("https://ns.volunteeringdata.io/sessionLocation", TermAs.instance(VolunteerLocation), TermFrom.instance);
  }
}
