import { rest } from 'msw';
import page0 from './data/items/page0.json';
import page1 from './data/items/page1.json';
import page2 from './data/items/page2.json';
import { items } from './data/items/items';
import categoryPage0 from './data/items/category-page0.json';
import categoryPage1 from './data/items/category-page1.json';
import details from './data/items/details.json';
import writerDetails from './data/items/details-writer.json';
import category from './data/items/category.json';
import favoriteCategory from './data/items/favorite-category.json';
import { HOST } from '@constants/apis';
import CLIENT_ERROR from './data/error/400.json';
import sales from './data/items/sales.json';
import salesDone from './data/items/sales-done.json';
import { ItemStatus } from '@type-store/services/items';
import favoriteItems from './data/items/favorite-items.json';

const itemList = [page0, page1, page2];
const categoryItemList = [categoryPage0, categoryPage1];

export const handlers = [
  rest.get(`${HOST}/items`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = query.get('currentPageNum');
    const categoryIdx = query.get('categoryIdx');

    if (categoryIdx)
      return res(ctx.status(200), ctx.json(categoryItemList[Number(page)]));
    return res(ctx.status(200), ctx.json(itemList[Number(page)]));
  }),

  rest.get(`${HOST}/items/:itemIdx`, (req, res, ctx) => {
    const { itemIdx } = req.params;
    if (!itemIdx) return res(ctx.status(400), ctx.json(CLIENT_ERROR));
    const target = items.find((item) => item.itemIdx === Number(itemIdx));
    if (!target) return res(ctx.status(400), ctx.json(CLIENT_ERROR));

    if (itemIdx === '2') {
      return res(ctx.status(200), ctx.json(writerDetails));
    }
    return res(ctx.status(200), ctx.json(details));
  }),

  rest.get(`${HOST}/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(category));
  }),

  rest.get(`${HOST}/members/interest/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(favoriteCategory));
  }),

  rest.get(`${HOST}/members/interest`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(favoriteItems));
  }),

  rest.get(`${HOST}/members/items`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const status = query.get('status');
    if (status === ItemStatus.SELLING)
      return res(ctx.status(200), ctx.json(sales));
    if (status === ItemStatus.SOLD)
      return res(ctx.status(200), ctx.json(salesDone));
    res(ctx.status(400), ctx.json(CLIENT_ERROR));
  }),

  rest.post(`${HOST}/items`, (req, res, ctx) => {
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

  rest.patch(`${HOST}/items/:itemIdx`, (req, res, ctx) => {
    const { itemIdx } = req.params;
    if (!itemIdx)
      return res(
        ctx.status(400),
        ctx.json({
          code: 400,
          message: '해당 상품이 존재하지 않아요.',
        })
      );
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '요청이 정상 처리되었습니다.',
      })
    );
  }),

  rest.delete(`${HOST}/items/:itemIdx`, (req, res, ctx) => {
    const { itemIdx } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '요청이 정상 처리되었습니다.',
      })
    );
  }),

  rest.post(`${HOST}/members/interest`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '요청이 정상 처리되었습니다.',
      })
    );
  }),
];
