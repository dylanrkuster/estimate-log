'use server';

import { db } from '@/db';
import { notFound, redirect } from 'next/navigation';
import { MINUTES_MAX, REASONING_MAX } from './limits';

export async function saveEstimateActuals(formData: FormData) {
    const id = Number(formData.get('id'));
    if (!id || id <= 0) {
        return notFound();
    }

    const estimate = await db.estimate.findUnique({
        where: { id },
    });
    if (!estimate) {
        return notFound();
    }

    const rawMinutes = String(formData.get('actualMinutes') ?? '').trim();
    const minutes = Number(rawMinutes);
    if (
        rawMinutes === '' ||
        !/^\d+$/.test(rawMinutes) ||
        minutes < 0 ||
        minutes > MINUTES_MAX
    ) {
        return;
    }

    const rawReasoning = formData.get('actualReasoning');
    const reasoning =
        typeof rawReasoning === 'string' && rawReasoning.trim() !== ''
            ? rawReasoning
            : null;
    if (reasoning !== null && reasoning.length > REASONING_MAX) {
        return;
    }

    await db.estimate.update({
        where: { id },
        data: {
            actualMinutes: minutes,
            actualReasoning: reasoning,
        },
    });

    redirect('/');
}
