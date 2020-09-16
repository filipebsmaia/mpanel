import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 64px;

  img {
    width: 64px;
  }

  a {
    img {
      border-radius: 50%;
    }
  }
`;
