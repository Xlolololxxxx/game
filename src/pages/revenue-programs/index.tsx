import React from 'react';
import { Helmet } from 'react-helmet-async';

import ProgramProvider from './provider';
import Body from './body';

const Programs = () => {

  return (
    <ProgramProvider>
      <>
        <Helmet>
          <title> Revenue Program </title>
        </Helmet>
        <Body />
      </>
    </ProgramProvider>
  );
}

export default Programs;
