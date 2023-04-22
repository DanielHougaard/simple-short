import { PrismaClient, Link } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import status from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { LinkError } from '../../../types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Partial<Link> | LinkError>) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      const link = await prisma.link.findFirst({
        where: {
          slug: slug as string,
        },
        select: {
          url: true,
          slug: true,
        },
      });

      if (!link) return res.status(status.NOT_FOUND).end();
      return res.status(status.OK).json(link);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError
        || err instanceof PrismaClientUnknownRequestError
        || err instanceof PrismaClientRustPanicError
      ) {
        return res.status(status.BAD_REQUEST).json(err);
      }

      console.log(err); // eslint-disable-line no-console
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ouch something went wrong! If the issue persists, please open an issue on GitHub.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(status.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
