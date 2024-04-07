'use server'

// This funcions are the interface between the frontend and the Strapi API.
// All funcions accept domain models and return domain models.
// The functions transform domain models to Strapi models before sending them to the API,
// and transform Strapi models to domain models when receiving them from the API.

import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from "@/helpers/object-to-strapi-body";
import { Moso } from "@/slices/moso";
import {
    StrapiEntity,
    StrapiResponseGetAll,
    StrapiResponseGetOne,
} from "@/types/strapi.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchMosos() {
    try {
        const response = await fetch(`${API_URL}/mosos/`, {
            cache: 'no-store',
        });
        const responseMosos = await response.json() as StrapiResponseGetAll<Moso>;
        const mosos: Moso[] = responseMosos.data.map((value: StrapiEntity<Moso>) => transformFromStrapi<Moso>(value));
        return mosos;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all mosos.');
    }
}

export async function fetchMosoById(id: number) {
    try {
        const response = await fetch(`${API_URL}/mosos/${id}`, {
            cache: 'no-store',
        });
        const responseMoso = await response.json() as StrapiResponseGetOne<Moso>;
        const moso: Moso = transformFromStrapi<Moso>(responseMoso.data);
        return moso;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch moso.');
    }
}

export async function addMoso(moso: Omit<Moso, 'id'>) {
    try {
        const body = transformToStrapi<Moso>(moso);
        await fetch(`${API_URL}/mosos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to add moso.');
    }
    revalidatePath('/moso');
    redirect('/moso');
}

export async function updateMoso(moso: Moso) {
    try {
        const body = transformToStrapi<Moso>(moso);
        await fetch(`${API_URL}/mosos/${moso.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to update moso.');
    }
    revalidatePath('/moso');
    redirect('/moso');
}

export async function deleteMoso(id: number) {
    try {
        await fetch(`${API_URL}/mosos/${id}`, {
            method: 'DELETE',
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to delete moso.');
    }
    revalidatePath('/moso');
    redirect('/moso');
}
