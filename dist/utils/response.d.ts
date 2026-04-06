import { Response } from 'express';
export declare const successResponse: <T>(res: Response, data: T, message?: string) => Response;
export declare const createdResponse: <T>(res: Response, data: T, message?: string) => Response;
export declare const errorResponse: (res: Response, message?: string, statusCode?: number) => Response;
export declare const unauthorizedResponse: (res: Response, message?: string) => Response;
export declare const forbiddenResponse: (res: Response, message?: string) => Response;
export declare const notFoundResponse: (res: Response, message?: string) => Response;
export declare const badRequestResponse: (res: Response, message?: string) => Response;
export declare const validationErrorResponse: (res: Response, message?: string) => Response;
//# sourceMappingURL=response.d.ts.map