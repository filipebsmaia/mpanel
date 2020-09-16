import React, { useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Panel from '../../components/Panel';
import Home from './Home';

interface DashboardParams {
  page: string;
}

const Dashboard: React.FC = () => {
  const { page } = useRouteMatch<DashboardParams>().params;
  const history = useHistory();

  const PageContent = useMemo(() => {
    if (page === 'home') {
      return <Home />;
    }
    history.push('/panel/dashboard/home');
    return undefined;
  }, [history, page]);

  const getPath = (): string => {
    return 'dashboard/home';
  };

  return <Panel getPath={getPath}>{PageContent}</Panel>;
};

export default Dashboard;
