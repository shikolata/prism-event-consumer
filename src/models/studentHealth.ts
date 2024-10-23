export interface StudentHealth {
    userId: number;
    firstName?: string;
    lastName?: string;
    classId: number;
    className?: string;
    completedActions?: number;
    totalActions?: number;
    score?: number;
}

export interface VrUser {
    firstName: string;
    lastName: string;
}

export interface VrClass {
    className: string;
}

// export interface Task