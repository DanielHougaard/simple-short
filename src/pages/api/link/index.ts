import { PrismaClient, Link } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import status from 'http-status';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { LinkError } from '../../types';

const prisma = new PrismaClient();

const formatUrl = (url?: string) => {
  if (!url || !validator.isURL(url)) return null;

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Link | LinkError>) {
  if (req.method === 'POST') {
    try {
      const url = formatUrl(req.body.url);
      const slug = nanoid(8);

      if (!url) return res.status(status.NOT_ACCEPTABLE).end();

      const existingLink = await prisma.link.findFirst({
        where: {
          url,
        },
      });
      if (existingLink) return res.status(status.OK).json(existingLink);

      const link = await prisma.link.create({
        data: {
          url,
          slug,
        },
      });
      return res.status(status.OK).json(link);
    } catch (err: any) {
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
    res.setHeader('Allow', ['POST']);
    return res.status(status.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
