import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError } from '@prisma/client/runtime/library';

export type LinkError = PrismaClientKnownRequestError
| PrismaClientUnknownRequestError
| PrismaClientRustPanicError
| { message: string };
