import React from 'react';
import { featureMoleSchema } from '../sandbox/schemas/feature-mole';
import { LiveDoc } from '../src/livedoc';

export const Main = () => {
  return (
    <LiveDoc
      logo=""
      schema={featureMoleSchema.library + featureMoleSchema.schema}
    />
  );
};
