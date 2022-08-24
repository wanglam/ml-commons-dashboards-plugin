import React from 'react';
import { EuiPageHeader, EuiButton, EuiBasicTable, EuiSpacer } from '@elastic/eui';

import { ModelTable } from '../../components/model_table';

export function ModelList() {
  return (
    <>
      <EuiPageHeader
        pageTitle="Models"
        rightSideItems={[<EuiButton fill>Train new model</EuiButton>]}
        bottomBorder
      />
      <EuiSpacer />
      <ModelTable />
    </>
  );
}
