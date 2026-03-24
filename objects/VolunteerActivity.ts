import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VolunteerActivity extends TermWrapper {

  get activityRequiresEmergencyParticipation(): Set<boolean> {
    return this.objects("https://solidproject.org/shapes/volunteer#activityRequiresEmergencyParticipation", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get activityTitle(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#activityTitle", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get activityRole(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#activityRole", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get activityDescription(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#activityDescription", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get activitySession(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#activitySession", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get activityImage(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#activityImage", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get activityOrganisation(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#activityOrganisation", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
