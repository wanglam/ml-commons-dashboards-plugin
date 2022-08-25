import React, { useEffect, useState, useCallback } from 'react';
import { EuiPageHeader, EuiButton, EuiSpacer } from '@elastic/eui';

import { ModelSearchItem } from '../../apis/model';
import { ModelTable } from '../../components/model_table';
import { APIProvider } from '../../apis/api_provider';

export function ModelList() {
  const [models, setModels] = useState<ModelSearchItem[]>([]);
  const [pagination, setCurrentPageAndPageSize] = useState({
    currentPage: 1,
    pageSize: 30,
    totalRecords: undefined as number | undefined,
    totalPages: undefined as number | undefined,
  });

  const handlePaginationChange = useCallback(
    (pagination: { currentPage: number; pageSize: number }) => {
      setCurrentPageAndPageSize((previousValue) => {
        if (
          previousValue.currentPage === pagination.currentPage &&
          previousValue.pageSize === pagination.pageSize
        ) {
          return previousValue;
        }
        return {
          ...previousValue,
          ...pagination,
        };
      });
    },
    []
  );

  useEffect(() => {
    APIProvider.getAPI('model')
      .search({ currentPage: pagination.currentPage, pageSize: pagination.pageSize })
      .then((payload) => {
        setModels(payload.data);
        setCurrentPageAndPageSize(payload.pagination);
      });
  }, [pagination.currentPage, pagination.pageSize, setModels, setCurrentPageAndPageSize]);

  return (
    <>
      <EuiPageHeader
        pageTitle="Models"
        rightSideItems={[<EuiButton fill>Train new model</EuiButton>]}
        bottomBorder
      />
      <EuiSpacer />
      <ModelTable
        models={models}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
}
