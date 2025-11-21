import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const mainRoutes = ['/profile', '/gol'];
const defaultFallback = resolve('/(main)/profile');

const handleUserAccess: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	console.log('Running server hooks for path: ' + path);

	if (!mainRoutes.includes(path)) {
		throw redirect(303, defaultFallback);
	}

	return await resolve(event);
};

export const handle = sequence(handleParaglide, handleUserAccess);
