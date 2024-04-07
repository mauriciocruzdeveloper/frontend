export interface Entity {
    id: number;
    [key: string]: any;
}

export interface StrapiEntity<T extends Entity> {
    id: number;
    attributes: Omit<T, 'id'>;
}

export interface StrapiBodyPost<T extends Entity> {
    data: Omit<T, "id">;
}

export interface StrapiResponseGetAll<T extends Entity> {
    data: StrapiEntity<T>[];
    meta: {
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
}

export interface StrapiResponseGetOne<T extends Entity> {
    data: StrapiEntity<T>;
}

export interface StrapiResponsePost<T extends Entity> {
    data: StrapiEntity<T>;
}
