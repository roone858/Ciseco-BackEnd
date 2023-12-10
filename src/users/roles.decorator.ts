// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config(); // Load env
export const ROLES_KEY = process.env.ROLES_KEY || 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
