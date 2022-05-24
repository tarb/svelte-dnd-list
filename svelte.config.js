import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		prerender: {
			default: true,
		},
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
		})
	}
};

export default config;
