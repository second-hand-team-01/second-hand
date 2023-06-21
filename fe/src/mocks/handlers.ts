import { rest } from 'msw';
import page0 from './data/items/page0.json';
import page1 from './data/items/page1.json';
import page2 from './data/items/page2.json';
import category from './data/category.json';
import { HOST } from '@constants/apis';

const items = [page0, page1, page2];

export const handlers = [
  rest.get(`${HOST}/items`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = query.get('page');
    return res(ctx.status(200), ctx.json(items[Number(page)]));
  }),

  rest.get(`${HOST}/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(category));
  }),
];
