import { Utils } from 'graphql-zeus';
import React, { useEffect, useState } from 'react';
import { LiveDoc } from '../src/livedoc';

export const Main = () => {
  const [schema, setSchema] = useState<string>();
  useEffect(() => {
    Utils.getFromUrl(
      'https://faker.graphqleditor.com/a-team/finance-manager/graphql',
    ).then((result) => setSchema(result));
  }, []);
  console.log(schema);
  return schema ? <LiveDoc schema={schema} /> : <></>;
};
