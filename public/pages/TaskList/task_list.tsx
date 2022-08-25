import React, { useEffect, useState, useCallback } from 'react';
import { EuiPageHeader, EuiButton, EuiSpacer } from '@elastic/eui';

import { TaskSearchItem } from '../../apis/task';
import { APIProvider } from '../../apis/api_provider';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskSearchItem[]>([]);
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
    APIProvider.getAPI('task')
      .search({ currentPage: pagination.currentPage, pageSize: pagination.pageSize })
      .then((payload) => {
        setTasks(payload.data);
        setCurrentPageAndPageSize(payload.pagination);
      });
  }, [pagination.currentPage, pagination.pageSize]);

  console.log(tasks);

  return (
    <>
      <EuiPageHeader
        pageTitle="Tasks"
        rightSideItems={[<EuiButton fill>Train new model</EuiButton>]}
        bottomBorder
      />
      <EuiSpacer />
    </>
  );
}
