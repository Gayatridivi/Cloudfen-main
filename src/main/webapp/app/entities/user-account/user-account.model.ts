export interface IUserAccount {
  id?: number;
  userId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  passport?: string | null;
  email?: string | null;
}

export class UserAccount implements IUserAccount {
  constructor(
    public id?: number,
    public userId?: number | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public phone?: string | null,
    public passport?: string | null,
    public email?: string | null
  ) {}
}

export function getUserAccountIdentifier(userAccount: IUserAccount): number | undefined {
  return userAccount.id;
}
