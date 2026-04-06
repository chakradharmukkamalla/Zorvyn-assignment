import { Response } from 'express';
import { ApiResponse } from '../types/express.d';

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Success'
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(200).json(response);
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Created successfully'
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(201).json(response);
};

export const errorResponse = (
  res: Response,
  message: string = 'An error occurred',
  statusCode: number = 500
): Response => {
  const response: ApiResponse = {
    success: false,
    error: message,
  };
  return res.status(statusCode).json(response);
};

export const unauthorizedResponse = (res: Response, message: string = 'Unauthorized'): Response => {
  return errorResponse(res, message, 401);
};

export const forbiddenResponse = (res: Response, message: string = 'Forbidden'): Response => {
  return errorResponse(res, message, 403);
};

export const notFoundResponse = (res: Response, message: string = 'Resource not found'): Response => {
  return errorResponse(res, message, 404);
};

export const badRequestResponse = (res: Response, message: string = 'Bad request'): Response => {
  return errorResponse(res, message, 400);
};

export const validationErrorResponse = (
  res: Response,
  message: string = 'Validation failed'
): Response => {
  return errorResponse(res, message, 422);
};