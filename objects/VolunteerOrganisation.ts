import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VolunteerOrganisation extends TermWrapper {

  get organisationCharityNumber(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationCharityNumber", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organisationName(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationName", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organisationActivity(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationActivity", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organisationDescription(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationDescription", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organisationCause(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationCause", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organisationImage(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationImage", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organisationWebsite(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#organisationWebsite", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
