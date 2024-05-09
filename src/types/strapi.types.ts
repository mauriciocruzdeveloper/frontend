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

export interface StrapiResponseBase {
    error: {
        status: number,
        name: string,
        message: string,
        details: {},
    }  
}

export interface StrapiResponseGetAll<T extends Entity> extends StrapiResponseBase {
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

export interface StrapiResponseGetOne<T extends Entity> extends StrapiResponseBase{
    data: StrapiEntity<T>;
}

export interface StrapiResponsePost<T extends Entity> extends StrapiResponseBase{
    data: StrapiEntity<T>;
}
