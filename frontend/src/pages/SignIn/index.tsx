import React, { useRef } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

import { Container, LoginContainer } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <LoginContainer>
        <img src={logoImg} alt="MPanel" />
        <Form
          ref={formRef}
          onSubmit={() => {
            //
          }}
        >
          <h1>Faça seu login</h1>
          <Input name="nick" icon={FiUser} placeholder="Nickname" />
          <Input name="password" icon={FiLock} placeholder="Senha" />

          <Button type="submit">Entrar</Button>
          <Link to="forgot-password">Esqueci minha senha</Link>
        </Form>
      </LoginContainer>
    </Container>
  );
};

export default SignIn;
