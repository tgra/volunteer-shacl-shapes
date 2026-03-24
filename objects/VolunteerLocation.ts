import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VolunteerLocation extends TermWrapper {

  get locationAddress(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#locationAddress", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get locationLongitude(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#locationLongitude", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get locationLatitude(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#locationLatitude", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get locationSession(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#locationSession", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get locationName(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#locationName", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get locationGeometry(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#locationGeometry", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
