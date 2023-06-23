import { rest } from 'msw';
import page0 from './data/items/page0.json';
import page1 from './data/items/page1.json';
import page2 from './data/items/page2.json';
import { items } from './data/items/items';
import details from './data/items/details.json';
import category from './data/category.json';
import { HOST } from '@constants/apis';
import CLIENT_ERROR from './data/error/400.json';

const itemList = [page0, page1, page2];

export const handlers = [
  rest.get(`${HOST}/items`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = query.get('page');
    return res(ctx.status(200), ctx.json(itemList[Number(page)]));
  }),

  rest.get(`${HOST}/items/:itemIdx`, (req, res, ctx) => {
    const { itemIdx } = req.params;
    if (!itemIdx) return res(ctx.status(400), ctx.json(CLIENT_ERROR));
    const target = items.find((item) => item.itemIdx === Number(itemIdx));
    if (!target) return res(ctx.status(400), ctx.json(CLIENT_ERROR));
    return res(ctx.status(200), ctx.json(details));
  }),

  rest.get(`${HOST}/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(category));
  }),

  rest.post(`${HOST}/items`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = query.get('page');
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '요청이 정상 처리되었습니다.',
        data: {
          itemIdx: 1,
        },
      })
    );
  }),
];
