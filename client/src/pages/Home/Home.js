
import * as React from 'react';
import ProductHero from './modules/views/ProductHero';
import withRoot from './modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
    </React.Fragment>
  );
}

export default withRoot(Index);