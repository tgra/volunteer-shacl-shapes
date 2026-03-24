import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VolunteerTime extends TermWrapper {

  get timeSession(): Set<string> {
    return this.objects("https://solidproject.org/shapes/volunteer#timeSession", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
