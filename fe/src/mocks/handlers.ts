import { rest } from 'msw';
import { HOST } from '@constants/apis';

export const handlers = [
  rest.post(`${URL}/users`, (req, res, ctx) => {
    const newUser = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        message: 'User created successfully',
        user: newUser,
      })
    );
  }),
];
