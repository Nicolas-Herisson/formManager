export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserWithRole extends IUser {
  role: IRole;
}

export interface IRole {
  id: string;
  name: string;
}
