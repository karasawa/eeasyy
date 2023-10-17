import { SetMetadata } from '@nestjs/common';

export const IS_JWT_PUBLIC_KEY = 'isPublic';
export const JwtPublic = () => SetMetadata(IS_JWT_PUBLIC_KEY, true);
