import { Entity, StrapiBodyPost, StrapiEntity } from "@/types/strapi.type";

export function transformToStrapi<
T extends Entity
>(entity: Omit<T, 'id'>): StrapiBodyPost<T> {
  const {...data} = entity;

  return {
    data  
  }
}

export function transformFromStrapi<T extends Entity>(strapiEntity: StrapiEntity<T>): T {
  const {id, attributes} = strapiEntity;

  return {
    id,
    ...attributes
  } as T;
}