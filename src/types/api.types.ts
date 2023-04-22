import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError } from '@prisma/client/runtime';

export type LinkError = PrismaClientKnownRequestError
| PrismaClientUnknownRequestError
| PrismaClientRustPanicError
| { message: string };
