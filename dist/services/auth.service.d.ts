export declare const authService: {
    register(email: string, password: string, name: string, role?: string): Promise<any>;
    login(email: string, password: string): Promise<{
        token: never;
        user: {
            isActive: any;
            id: number;
            email: string;
            name: string;
            role: Role;
        };
    }>;
    getProfile(userId: number): Promise<any>;
};
//# sourceMappingURL=auth.service.d.ts.map