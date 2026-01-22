import { UserRole } from '../../enums/user-role.enum';

export interface Token {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': UserRole;
  iat: number;
  exp: number;
}
