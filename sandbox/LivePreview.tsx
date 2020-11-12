import { Utils } from 'graphql-zeus';
import React, { useEffect, useState } from 'react';
import { LiveDoc } from '../src/livedoc';

export const Main = () => {
  const [schema, setSchema] = useState<string>();
  useEffect(() => {
    Utils.getFromUrl(
      'https://faker.graphqleditor.com/a-team/foodeli-tenant/graphql',
    ).then((result) => setSchema(result));
  }, []);
  return schema ? <LiveDoc schema={schema} /> : <></>;
};
