export interface IQuestion {
  id: number;
  title: string;
  selector: string;
  required: boolean;
  options?: IOption[];
  form_id: number;
  image_url?: string;
}

export interface ICreateQuestion
  extends Optional<IQuestion, "id" | "createdAt" | "updatedAt" | "options"> {
  title: string;
  selector: string;
  required: boolean;
  form_id: number;
  image_url?: string;
}
