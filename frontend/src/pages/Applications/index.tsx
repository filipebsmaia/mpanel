import React, { useMemo, useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { useRouteMatch } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Form } from '@unform/web';
import Panel from '../../components/Panel';

import {
  Content,
  ConsoleContainer,
  ConsoleHeader,
  ConsoleButtonContainer,
  Console,
  ConsoleMessageContainer,
  ConsoleMessage,
  ConsoleInputContainer,
} from './styles';

import { useTheme } from '../../hooks/theme';
import Card from '../../components/Card';
import CardList from '../../components/Card/CardList';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';

interface ServerRouteProps {
  serverId: string;
}

interface ServerInterface {
  id: string;
  name: string;
  port: number;
  directory: string;
  autostart: boolean;
  crashrestart: boolean;
  maxplayers: number;
  memory: number;
  file: string;
  lastpid: number;
}
interface StatusInterface {
  name: string;
  id: string;
  port: number;
  status: string;
  memory: number;
  freeMemory: number;
  totalMemory: number;
  todayMaxMemory: number;
  cpu: number;
  onlinePlayers: number;
  maxPlayers: number;
  todayMaxPlayers: number;
  pid: number;
  type: string;
}

const Server: React.FC = () => {
  const [server, setServer] = useState<ServerInterface>();
  const [status, setStatus] = useState<StatusInterface>();
  const [logs, setLogs] = useState<string[]>([]);

  const { theme } = useTheme();
  const { serverId } = useRouteMatch<ServerRouteProps>().params;

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
      const parsedStatus = JSON.parse(message) as StatusInterface;
      setStatus(parsedStatus);
    };
    const handleLog = (message: string): void => {
      setLogs(state => [...state, message]);
    };

    socket.on(`${serverId}:log`, handleLog);
    socket.on(`${serverId}:status`, handleStatus);

    // console.log(status);

    return () => {
      socket.off(`${serverId}:log`, handleLog);
      socket.off(`${serverId}:status`, handleStatus);
    };
  }, [logs, serverId, socket]);

  useEffect(() => {
    api.get(`/servers/${serverId}`).then(response => {
      setServer(response.data);
    });

    setLogs(state => [
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
      'a',
    ]);
  }, [serverId]);

  return (
    <Panel getPath={() => `applications/${serverId}`}>
      <Content>
        <CardList>
          <Card
            type="side"
            color={theme.colors.darkGreen}
            itens={[
              {
                title: 'Online Players',
                value: status?.onlinePlayers,
              },
              { title: 'Max Players', value: status?.maxPlayers },
              { title: 'Today Max', value: status?.todayMaxPlayers },
            ]}
          />
          <Card
            type="side"
            color={theme.colors.darkRed}
            itens={[
              { title: 'Server Memory', value: `${status?.memory} MB` },
              { title: 'Max memory', value: `${status?.totalMemory} MB` },
              { title: 'Today Max ', value: `${status?.todayMaxMemory} MB` },
            ]}
          />
          <Card
            type="single"
            color={theme.colors.darkCyan}
            itens={[{ title: 'Used CPU', value: `${status?.cpu} %` }]}
          />
          <Card
            type="single"
            color={theme.colors.darkPurple}
            itens={[{ title: 'PID', value: status?.pid }]}
          />
        </CardList>
        <ConsoleContainer>
          <ConsoleHeader>
            <h2>Console</h2>
            <ConsoleButtonContainer>
              <Button color={theme.colors.red}>Parar</Button>
              <Button color={theme.colors.green}>Reiniciar</Button>
            </ConsoleButtonContainer>
          </ConsoleHeader>
          <Console>
            <ConsoleMessageContainer>
              {logs.map(log => {
                return <ConsoleMessage key={log}>{log}</ConsoleMessage>;
              })}
            </ConsoleMessageContainer>
            <ConsoleInputContainer>
              <Form onSubmit={() => {}}>
                <Input
                  icon={MdKeyboardArrowRight}
                  name="command"
                  placeholder="Digite um comando"
                />
              </Form>
            </ConsoleInputContainer>
          </Console>
        </ConsoleContainer>
      </Content>
    </Panel>
  );
};

export default Server;
