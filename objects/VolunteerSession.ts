import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VolunteerSession extends TermWrapper {

  get sessionActivity(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#sessionActivity", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get sessionTime(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#sessionTime", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get sessionLocation(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#sessionLocation", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
