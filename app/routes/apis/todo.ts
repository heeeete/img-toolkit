import type { ActionFunctionArgs } from 'react-router';

export const loader = ({ request }: ActionFunctionArgs) => {
  return {
    todo: ['빨래', '청소', '장보기'],
  };
};
