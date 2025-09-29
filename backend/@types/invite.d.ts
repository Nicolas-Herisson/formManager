export interface IInvite {
  id: number;
  sender_id: string;
  receiver_id: string;
}

export interface IInviteCreate extends Optional<IInvite, "id"> {}
