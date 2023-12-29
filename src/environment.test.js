import environment from "./environment";
import { Readable } from "readable-stream";

describe("environment global", () => {
  test("new document", () => {
    let doc = environment.newDocument();
    expect(doc.metadata);
  });

  test("load document", () => {
    let doc = environment.loadDocument(
      "urn:example",
      "application/ld+json",
      Readable.from(
        JSON.stringify({
          "@context": "https://json-ld.org/contexts/person.jsonld",
          "@id": "http://dbpedia.org/resource/John_Lennon",
          name: "John Lennon",
          born: "1940-10-09",
          spouse: "http://dbpedia.org/resource/Cynthia_Lennon",
        })
      )
    );
    expect(doc.metadata);
    expect(environment.getDocument("urn:example") === doc);
  });

  test.todo("save document");
});
