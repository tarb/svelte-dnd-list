import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'docs',
		}),
		paths: {
			base: dev ? '' : '/svelte-dnd-list',
		},
		prerender: {
			crawl: false,
			default: true,
		},
	}
};

export default config;
