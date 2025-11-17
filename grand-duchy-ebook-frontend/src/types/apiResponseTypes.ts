export interface IApiErrorResponse {
  data: {
    success: boolean;
    statusCode: number;
    message: string;
    errorMessages: Array<{
      path: string;
      message: string;
    }>;
  };
}

export interface IAuthApiSuccessResponse {
  data: {
    token: string;
    userData: string;
  } | null;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IApiSuccessResponse {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IFilterApiSuccessResponse {
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: any;
  };
  message: string;
  statusCode: number;
  success: boolean;
}
