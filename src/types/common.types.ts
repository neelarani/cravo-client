export interface IResponse<T> {
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
  data: T;
}

export interface ForgotPasswordPayload {
  email: string;
}
