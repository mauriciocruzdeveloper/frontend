import { Entity, StrapiBodyPost, StrapiEntity } from "@/types/strapi.types";

export function transformToStrapi<
  T extends Entity
>(entity: Omit<T, 'id'>): StrapiBodyPost<T> {
  const { ...data } = entity;

  return {
    data
  }
}

export function transformFromStrapi<T extends Entity>(strapiEntity: StrapiEntity<T>): T {
  const { id, attributes } = strapiEntity;

  let entity = {
    id,
    ...attributes
  } as T;

  let newEntity: { [key: string]: any } = { ...entity };
  Object.keys(entity).forEach((key) => {
    if (entity[key]?.data && typeof entity[key] === 'object') {
      newEntity[key] = transformFromStrapi(entity[key].data);
    }
  });

  return newEntity as T;
}