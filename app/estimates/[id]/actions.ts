'use server';

import { db } from '@/db';
import { notFound, redirect } from 'next/navigation';
import { calendarDate, MINUTES_MAX, REASONING_MAX } from './limits';

export type SaveActualsState = {
    error: string | null;
};

function emptyToNull(value: FormDataEntryValue | null) {
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }
    return value;
}

function lockedFieldsChanged(
    formData: FormData,
    estimate: {
        name: string;
        date: Date;
        projectedMinutes: number;
        projectedReasoning: string | null;
    },
) {
    const postedName = formData.get('name');
    if (postedName != null && String(postedName) !== estimate.name) {
        return true;
    }

    const postedDate = formData.get('date');
    if (
        postedDate != null &&
        String(postedDate) !== calendarDate(estimate.date)
    ) {
        return true;
    }

    const postedProjectedMinutes = formData.get('projectedMinutes');
    if (
        postedProjectedMinutes != null &&
        Number(postedProjectedMinutes) !== estimate.projectedMinutes
    ) {
        return true;
    }

    const postedProjectedReasoning = formData.get('projectedReasoning');
    if (
        postedProjectedReasoning != null &&
        emptyToNull(postedProjectedReasoning) !==
            (estimate.projectedReasoning || null)
    ) {
        return true;
    }

    return false;
}

export async function saveEstimateActuals(
    _prev: SaveActualsState,
    formData: FormData,
): Promise<SaveActualsState> {
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

    if (lockedFieldsChanged(formData, estimate)) {
        return {
            error: 'Name, date, and projection cannot be changed.',
        };
    }

    const rawMinutes = String(formData.get('actualMinutes') ?? '').trim();
    if (estimate.actualMinutes != null && rawMinutes === '') {
        return { error: 'Actual minutes cannot be cleared.' };
    }

    const minutes = Number(rawMinutes);
    if (
        rawMinutes === '' ||
        !/^\d+$/.test(rawMinutes) ||
        minutes < 0 ||
        minutes > MINUTES_MAX
    ) {
        return {
            error: `Enter actual minutes as a whole number from 0 to ${MINUTES_MAX}.`,
        };
    }

    const reasoning = emptyToNull(formData.get('actualReasoning'));
    if (reasoning !== null && reasoning.length > REASONING_MAX) {
        return {
            error: `Actual reasoning must be ${REASONING_MAX} characters or fewer.`,
        };
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
