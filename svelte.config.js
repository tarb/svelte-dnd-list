import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'docs'
		}),
		paths: {
			base: dev ? '' : '/svelte-dnd-list'
		},
		prerender: {
			crawl: false,
			entries: ['*'],
			handleHttpError: 'warn',
		}
	}
};

export default config;
