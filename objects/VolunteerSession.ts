import { TermWrapper, ObjectMapping } from "rdfjs-wrapper";
import { VolunteerActivity } from './VolunteerActivity.js';
import { VolunteerLocation } from './VolunteerLocation.js';
import { VolunteerTime } from './VolunteerTime.js';

export class VolunteerSession extends TermWrapper {

  get sessionHasActivity(): Set<VolunteerActivity> {
    return this.objects("https://ns.volunteeringdata.io/sessionActivity", ObjectMapping.as(VolunteerActivity), ObjectMapping.as(VolunteerActivity));
  }

  get sessionHasTime(): Set<VolunteerTime> {
    return this.objects("https://ns.volunteeringdata.io/sessionTime", ObjectMapping.as(VolunteerTime), ObjectMapping.as(VolunteerTime));
  }

  get sessionHasLocation(): Set<VolunteerLocation> {
    return this.objects("https://ns.volunteeringdata.io/sessionLocation", ObjectMapping.as(VolunteerLocation), ObjectMapping.as(VolunteerLocation));
  }
}
