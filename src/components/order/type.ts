export type Order = {
    id: number;
    userId?: number;
    courseId?: number;
    affiliateId?: number;
    initialSum?: number; // Tong tien chua khuyen mai
    discount?: number; // So tien khuyen mai
    total?: number; // Tong tien sau khi tinh khuyen mai
    status?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
}