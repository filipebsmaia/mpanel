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

interface ServerRouteProps {
  serverId: string;
}

const Server: React.FC = () => {
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
    const handleStatus = (status: string): void => {
      // setLogs();
    };
    const handleLog = (log: string): void => {
      setLogs(state => [...state, log]);
    };

    socket.on(`${serverId}:log`, handleLog);
    socket.on(`${serverId}:status`, handleStatus);

    // console.log(status);

    return () => {
      socket.off(`${serverId}:log`, handleLog);
      socket.off(`${serverId}:status`, handleStatus);
    };
  }, [logs, serverId, socket]);

  return (
    <Panel getPath={() => `applications/${serverId}`}>
      <Content>
        <CardList>
          <Card
            type="side"
            color={theme.colors.darkGreen}
            itens={[
              { title: 'Online Players', value: '0 / 100' },
              { title: 'Max Players', value: 0 },
              { title: 'Today Max', value: 0 },
            ]}
          />
          <Card
            type="side"
            color={theme.colors.darkRed}
            itens={[
              { title: 'Server Memory', value: '986 MB' },
              { title: 'Max memory', value: '1024 MB' },
              { title: 'Today Max ', value: '992 MB' },
            ]}
          />
          <Card
            type="side"
            color={theme.colors.darkCyan}
            itens={[
              { title: 'Used CPU', value: '0 %' },
              { title: 'Max CPU', value: '0 %' },
              { title: 'Today Max', value: '0 %' },
            ]}
          />
          <Card
            type="single"
            color={theme.colors.darkPurple}
            itens={[{ title: 'PID', value: 12578 }]}
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
              <ConsoleMessage>
                [10:46:26 INFO]: Starting minecraft server version 1.8.8
              </ConsoleMessage>
              <ConsoleMessage>
                [10:46:26 INFO]: Loading properties
              </ConsoleMessage>
              <ConsoleMessage>
                [10:46:26 INFO]: Default game type: SURVIVAL
              </ConsoleMessage>
              <ConsoleMessage>
                10:46:27 INFO]: This server is running CraftBukkit version
                git-Spigot-fdc1440-53fac9f (MC: 1.8.8) (Implementing API version
                1.8.8-R0.1-SNAPSHOT)
              </ConsoleMessage>
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
