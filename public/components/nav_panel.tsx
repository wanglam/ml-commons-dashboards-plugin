import React, { useCallback, useMemo } from 'react';
import { EuiSideNav } from '@elastic/eui';
import { Link, matchPath, useLocation } from 'react-router-dom';

export function NavPanel() {
  const location = useLocation();
  const items = useMemo(
    () => [
      {
        id: 'model',
        name: 'Model',
        href: '/model',
        isSelected: matchPath(location.pathname, '/model') !== null,
      },
      {
        id: 'task',
        name: 'Task',
        href: '/task',
        isSelected: matchPath(location.pathname, '/task') !== null,
      },
    ],
    [location.pathname]
  );
  const renderItem = useCallback(
    ({ href, ...restProps }) => <Link to={href!} {...restProps} />,
    []
  );
  return <EuiSideNav items={items} renderItem={renderItem} />;
}
