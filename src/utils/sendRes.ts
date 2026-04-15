import { Response } from "express";

interface SendResOptions<T> {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
  meta?: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  error?: Record<string, any>;
}

const sendRes = <T>(options: SendResOptions<T>) => {
  const { res, statusCode, success, message, data, meta, error } = options;

  res.status(statusCode).json({
    success,
    message,
    data: data,
    meta: meta,
    error: error,
  });
};

export default sendRes;
