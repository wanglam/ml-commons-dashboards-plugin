import React, { useEffect, useState } from 'react';
import { EuiPageHeader, EuiButton, EuiBasicTable, EuiSpacer } from '@elastic/eui';

import { ModelSearchItem, ModelService } from '../../services/model_service';
import { ModelTable } from '../../components/model_table';
import { ServiceProvider } from '../../services/service_provider';

export function ModelList() {
  const [models, setModels] = useState<ModelSearchItem[]>([]);
  const [pagination, setCurrentPageAndPageSize] = useState({
    currentPage: 1,
    pageSize: 30,
    totalRecords: undefined as number | undefined,
    totalPages: undefined as number | undefined,
  });
  useEffect(() => {
    ServiceProvider.getService('model')
      .search({ currentPage: pagination.currentPage, pageSize: pagination.pageSize })
      .then((payload) => {
        setModels(payload.data);
        setCurrentPageAndPageSize(payload.pagination);
      });
  }, [pagination, setModels, setCurrentPageAndPageSize]);

  return (
    <>
      <EuiPageHeader
        pageTitle="Models"
        rightSideItems={[<EuiButton fill>Train new model</EuiButton>]}
        bottomBorder
      />
      <EuiSpacer />
      <ModelTable models={models} pagination={pagination} />
    </>
  );
}
