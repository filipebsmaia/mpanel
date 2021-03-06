import React, { useEffect, useState, useMemo } from 'react';
import socketio from 'socket.io-client';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { useTheme } from '../../hooks/theme';

import { Content } from './styles';
import Panel from '../../components/Panel';
import Card from '../../components/Card';
import CardList from '../../components/Card/CardList';

interface GlobalStatus {
  memory: number;
  freeMemory: number;
  totalMemory: number;

  cpu: number[];
  currentCpu: number;

  onlinePlayers: number;
  maxPlayers: number;
  todayMaxPlayers: number;
}
const Home: React.FC = () => {
  const [status, setStatus] = useState<GlobalStatus>({} as GlobalStatus);

  const { theme } = useTheme();
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: {
          user_id: 'server',
        },
      }),
    [],
  );

  useEffect(() => {
    const handleStatus = (message: string): void => {
      const parsedStatus = JSON.parse(message);
      const formattedStatus: GlobalStatus = {
        ...parsedStatus,
        memory: Number(
          Math.round((parsedStatus.memory / 1024 / 1024) * 100) / 100,
        ),
        freeMemory: Number(
          Math.round((parsedStatus.freeMemory / 1024 / 1024) * 100) / 100,
        ),
        totalMemory: Number(
          Math.round((parsedStatus.totalMemory / 1024 / 1024) * 100) / 100,
        ),

        cpu: parsedStatus.cpu.map((cpu: number) => Number(cpu.toFixed(2))),
        currentCpu: Number((parsedStatus.cpu.pop() || 0).toFixed(2)),
      };

      setStatus(formattedStatus);
    };

    socket.on('status', handleStatus);

    // console.log(status);

    return () => {
      socket.off('status', handleStatus);
    };
  }, [status, socket]);
  return (
    <Panel getPath={() => 'home'}>
      <Content>
        <CardList>
          <Card
            type="side"
            color={theme.colors.darkGreen}
            itens={[
              { title: 'Online Players', value: status.onlinePlayers },
              { title: 'Max Players', value: status.maxPlayers },
              { title: 'Today Max', value: status.todayMaxPlayers },
            ]}
          />
          <Card
            type="side"
            color={theme.colors.darkRed}
            itens={[
              { title: 'Used Memory', value: status.memory },
              { title: 'Max Memory', value: status.totalMemory },
              { title: 'Free Memory', value: status.freeMemory },
            ]}
          />
          <Card
            type="graph"
            color={theme.colors.darkCyan}
            itens={[
              { title: 'Used CPU', value: status.currentCpu },
              { title: 'Max Memory', value: status.cpu },
            ]}
          />

          {/*
          <Card color={theme.colors.darkCyan}>
            <CardItem>
              <span>Used CPU</span>
              <strong>{`${status?.currentCpu} %`}</strong>
            </CardItem>
            <CardGraph>
              <Sparklines data={status.cpu} limit={100}>
                <SparklinesLine color={theme.colors.text} />
                <SparklinesSpots />
              </Sparklines>
            </CardGraph>
          </Card> */}
        </CardList>
      </Content>
    </Panel>
  );
};

export default Home;
