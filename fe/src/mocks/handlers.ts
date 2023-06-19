import { rest } from 'msw';
import items from './data/items.json';
import { HOST } from '@constants/apis';

export const handlers = [
  rest.get(`${HOST}/items`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(items));
  }),
];
