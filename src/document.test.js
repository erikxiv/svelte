import Document from './document';

describe('document', () => {
  test('metadata is not shared', () => {
    let document1 = new Document();
    let document2 = new Document();
    document1.metadata.x = 1;
    expect(document2.metadata.x !== 1);
  });

  test('get/set metadata', () => {
    let doc = new Document();
    doc.metadata.x = 1;
    expect(doc.metadata.x === 1);
    doc.metadata.x = 'a';
    expect(doc.metadata.x === 'a');
  });

  test.todo('get dataset');

  test.todo('get traverser'); // subset? nodeset? clownface?
});
