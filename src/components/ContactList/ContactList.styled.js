import styled from 'styled-components';

export const Title = styled.h2`
  margin: 0 0 24px;

  font-size: 24px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;

  color: #19293b;
`;

export const ListItem = styled.li`
  padding: 0 0 0 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  overflow: hidden;

  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:first-child {
    margin-top: 24px;
  }

  &:hover {
    background-color: #40bfff;
  }

  &:hover p,
  &:hover svg {
    color: #fff;
    font-weight: 800;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: #19293bbe;

  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    font-weight 200ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const DeleteButton = styled.button`
  padding: 4px;
  width: 36px;
  height: 36px;

  text-align: center;
  font-size: 12px;
  text-transform: uppercase;

  color: #0099e6;

  border-radius: 4px;
  border: none;
  background-color: transparent;

  cursor: pointer;
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 20px;
    height: 20px;
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background-color: #0099e6;
  }
`;
