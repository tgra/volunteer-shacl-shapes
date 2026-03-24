import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VolunteerRole extends TermWrapper {

  get roleRequirement(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleRequirement", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleCommitment(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleCommitment", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleDescription(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleDescription", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleMinimumAge(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleMinimumAge", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleAllowsRemoteParticipation(): Set<boolean> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleAllowsRemoteParticipation", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleMaximumAge(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleMaximumAge", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleSkill(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleSkill", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleAccessibility(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleAccessibility", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleTitle(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleTitle", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleApplyLink(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleApplyLink", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleReward(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleReward", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get roleActivity(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#roleActivity", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
