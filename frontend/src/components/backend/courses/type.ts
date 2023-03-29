export type Course = {
    id: number;
    teacherId?: number;
    name?: string;
    description?: string;
    introduction?: string;
    price?: string;
    status?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
}