interface UserFilter {
    page?: number;
    limit?: number;
    search?: string;
}
export declare const userService: {
    getAll(filter?: UserFilter): Promise<{
        users: any;
        pagination: {
            page: number;
            limit: number;
            total: any;
            totalPages: number;
        };
    }>;
    getById(id: number): Promise<any>;
    update(id: number, data: {
        name?: string;
        role?: string;
        isActive?: boolean;
    }): Promise<any>;
    deactivate(id: number): Promise<any>;
    activate(id: number): Promise<any>;
    delete(id: number): Promise<{
        message: string;
    }>;
};
export {};
//# sourceMappingURL=user.service.d.ts.map