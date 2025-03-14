export interface Artist {
    id: number;
    name: string;
    portrait: string;
    albumCount: number;
}

export interface PaginationData {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
}

export interface ArtistsListResponse<T> {
    data: T[];
    pagination: PaginationData;
}

export interface FilterState {
    include_image?: boolean;
    letter?: string;
    search?: string;
    type?: string;
}
