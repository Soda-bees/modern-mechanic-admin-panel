import { AxiosError } from "axios";

export type APIError<T = unknown> = AxiosError<{
  message: string;
  errors?: T;
}>;