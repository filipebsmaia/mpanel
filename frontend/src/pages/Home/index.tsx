import React, { useEffect, useState, useMemo } from 'react';
import socketio from 'socket.io-client';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { useTheme } from '../../hooks/theme';

import {
  Content,
  CardList,
  Card,
  CardItem,
  CardGraph,
  CardSide,
} from './styles';

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
    <Content>
      <CardList>
        <Card color={theme.colors.darkGreen}>
          <CardItem>
            <span>Online Players</span>
            <strong>{status.onlinePlayers}</strong>
          </CardItem>
          <CardSide>
            <CardItem>
              <span>Max Players</span>
              <strong>{status?.maxPlayers}</strong>
            </CardItem>
            <CardItem>
              <span>Today Max</span>
              <strong>{status?.todayMaxPlayers}</strong>
            </CardItem>
          </CardSide>
        </Card>

        <Card color={theme.colors.darkRed}>
          <CardItem>
            <span>Used Memory</span>
            <strong>{`${status?.memory}  MB`}</strong>
          </CardItem>
          <CardSide>
            <CardItem>
              <span>Max Memory</span>
              <strong>{`${status?.totalMemory} MB`}</strong>
            </CardItem>
            <CardItem>
              <span>Free Memory</span>
              <strong>{`${status?.freeMemory} MB`}</strong>
            </CardItem>
          </CardSide>
        </Card>

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
        </Card>
      </CardList>
    </Content>
  );
};

export default Home;
