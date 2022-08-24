import React from 'react';
import { EuiSideNav } from '@elastic/eui';
import { Link, matchPath, useLocation } from 'react-router-dom';

export function NavPanel() {
  const location = useLocation();
  return (
    <EuiSideNav
      items={[
        {
          id: 'model',
          name: 'Model',
          href: '/model',
          isSelected: matchPath(location.pathname, '/model') !== null,
        },
      ]}
      renderItem={({ href, ...restProps }) => <Link to={href!} {...restProps} />}
    />
  );
}
