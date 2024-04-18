'use server'

// This funcions are the interface between the frontend and the Strapi API.
// All funcions accept domain models and return domain models.
// The functions transform domain models to Strapi models before sending them to the API,
// and transform Strapi models to domain models when receiving them from the API.

import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from "@/helpers/object-to-strapi-body";
import { Moso } from "@/interfaces/interfaces";
import {
    Entity,
    StrapiEntity,
    StrapiResponseGetAll,
    StrapiResponseGetOne,
} from "@/types/strapi.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchEntities<T extends Entity>(name: string, page?: number, pageSize?: number) {
    try {
        let query = `${API_URL}/${name}`;
        if (page) query = `${query}?pagination[page]=${page}`;
        if (page && pageSize) query =  `${query}&pagination[pageSize]=${pageSize}`;
        const response = await fetch(query, {
            cache: 'no-store',
        });
        const responseEntities = await response.json() as StrapiResponseGetAll<T>;
        const total = responseEntities.meta.pagination.total;
        const entities: T[] = responseEntities.data.map((value: StrapiEntity<T>) => transformFromStrapi<T>(value));
        return { entities, total };
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch all ${name}.`);
    }
}

export async function fetchEntityById<T extends Entity>(name: string, id: number) {
    try {
        const response = await fetch(`${API_URL}/${name}/${id}`, {
            cache: 'no-store',
        });
        const responseEntity = await response.json() as StrapiResponseGetOne<T>;
        const entity: T = transformFromStrapi<T>(responseEntity.data);
        return entity;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to fetch ${name}.`);
    }
}

export async function addMoso<T extends Entity>(name: string, atributes: Omit<T, 'id'>) {
    try {
        const body = transformToStrapi<T>(atributes);
        await fetch(`${API_URL}/${name}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to add ${name}.`);
    }
    revalidatePath(`/dashboard/${name}`);
    redirect(`/dashboard/${name}`);
}

export async function updateMoso<T extends Entity>(name: string, entity: T) {
    try {
        const body = transformToStrapi<T>(entity);
        await fetch(`${API_URL}/${name}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to update ${name}.`);
    }
    revalidatePath(`/dashboard/${name}`);
    redirect(`/dashboard/${name}`);
}

export async function deleteMoso(name: string, id: number) {
    try {
        await fetch(`${API_URL}/${name}/${id}`, {
            method: 'DELETE',
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error(`Failed to delete ${name}.`);
    }
    revalidatePath(`/dashboard/${name}`);
    redirect(`/dashboard/${name}`);
}
