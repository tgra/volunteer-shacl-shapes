import { TermWrapper, LiteralAs, LiteralFrom, TermAs, TermFrom } from "@rdfjs/wrapper";
import { VolunteerAccessibility } from './VolunteerAccessibility.js';
import { VolunteerActivity } from './VolunteerActivity.js';
import { VolunteerRequirement } from './VolunteerRequirement.js';
import { VolunteerReward } from './VolunteerReward.js';
import { VolunteerSkill } from './VolunteerSkill.js';

export class VolunteerRole extends TermWrapper {

  get roleHasRequirement(): Set<VolunteerRequirement> {
    return this.objects("https://ns.volunteeringdata.io/roleRequirement", TermAs.instance(VolunteerRequirement), TermFrom.instance);
  }

  get roleHasCommitment(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleCommitment", LiteralAs.string, LiteralFrom.string);
  }

  get roleHasDescription(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleDescription", LiteralAs.string, LiteralFrom.string);
  }

  get roleHasMinimumAge(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleMinimumAge", LiteralAs.string, LiteralFrom.string);
  }

  get roleAllowsRemoteParticipation(): Set<boolean> {
    return this.objects("https://ns.volunteeringdata.io/roleAllowsRemoteParticipation", LiteralAs.boolean, LiteralFrom.boolean);
  }

  get roleHasMaximumAge(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleMaximumAge", LiteralAs.string, LiteralFrom.string);
  }

  get roleHasSkill(): Set<VolunteerSkill> {
    return this.objects("https://ns.volunteeringdata.io/roleSkill", TermAs.instance(VolunteerSkill), TermFrom.instance);
  }

  get roleHasAccessibility(): Set<VolunteerAccessibility> {
    return this.objects("https://ns.volunteeringdata.io/roleAccessibility", TermAs.instance(VolunteerAccessibility), TermFrom.instance);
  }

  get roleHasTitle(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleTitle", LiteralAs.string, LiteralFrom.string);
  }

  get roleHasApplyLink(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleApplyLink", LiteralAs.string, LiteralFrom.string);
  }

  get roleHasReward(): Set<VolunteerReward> {
    return this.objects("https://ns.volunteeringdata.io/roleReward", TermAs.instance(VolunteerReward), TermFrom.instance);
  }

  get roleHasActivity(): Set<VolunteerActivity> {
    return this.objects("https://ns.volunteeringdata.io/roleActivity", TermAs.instance(VolunteerActivity), TermFrom.instance);
  }
}
