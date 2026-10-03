const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an absolute site path with the configured base path. */
export const url = (path: string) => (path === '/' ? `${base}/` : `${base}${path}`);

export const showDrafts = import.meta.env.DEV || import.meta.env.SHOW_DRAFTS === 'true';
