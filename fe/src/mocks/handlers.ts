import { rest } from 'msw';
import items from './data/items.json';
import items2 from './data/items2.json';
import { HOST } from '@constants/apis';

export const handlers = [
  rest.get(`${HOST}/items`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = query.get('page');
    if (page === '0') {
      return res(ctx.status(400), ctx.json(items));
    }
    return res(ctx.status(200), ctx.json(items2));
  }),
];
