import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`SLick's Slices`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🧨</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make new doc id so we don't have random string
            .documentId('downtown')
        ),
      // add in rest of document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
