import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";
import { VolunteerAccessibility } from './VolunteerAccessibility.js';
import { VolunteerActivity } from './VolunteerActivity.js';
import { VolunteerRequirement } from './VolunteerRequirement.js';
import { VolunteerReward } from './VolunteerReward.js';
import { VolunteerSkill } from './VolunteerSkill.js';

export class VolunteerRole extends TermWrapper {

  get roleHasRequirement(): Set<VolunteerRequirement> {
    return this.objects("https://ns.volunteeringdata.io/roleRequirement", ObjectMapping.as(VolunteerRequirement), ObjectMapping.as(VolunteerRequirement));
  }

  get roleHasCommitment(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleCommitment", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get roleHasDescription(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleDescription", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get roleHasMinimumAge(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleMinimumAge", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get roleAllowsRemoteParticipation(): Set<boolean> {
    return this.objects("https://ns.volunteeringdata.io/roleAllowsRemoteParticipation", ValueMapping.literalToBoolean, TermMapping.booleanToLiteral);
  }

  get roleHasMaximumAge(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleMaximumAge", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get roleHasSkill(): Set<VolunteerSkill> {
    return this.objects("https://ns.volunteeringdata.io/roleSkill", ObjectMapping.as(VolunteerSkill), ObjectMapping.as(VolunteerSkill));
  }

  get roleHasAccessibility(): Set<VolunteerAccessibility> {
    return this.objects("https://ns.volunteeringdata.io/roleAccessibility", ObjectMapping.as(VolunteerAccessibility), ObjectMapping.as(VolunteerAccessibility));
  }

  get roleHasTitle(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleTitle", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get roleHasApplyLink(): Set<string> {
    return this.objects("https://ns.volunteeringdata.io/roleApplyLink", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }

  get roleHasReward(): Set<VolunteerReward> {
    return this.objects("https://ns.volunteeringdata.io/roleReward", ObjectMapping.as(VolunteerReward), ObjectMapping.as(VolunteerReward));
  }

  get roleHasActivity(): Set<VolunteerActivity> {
    return this.objects("https://ns.volunteeringdata.io/roleActivity", ObjectMapping.as(VolunteerActivity), ObjectMapping.as(VolunteerActivity));
  }
}
