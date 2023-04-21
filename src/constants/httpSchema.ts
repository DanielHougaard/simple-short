export default process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production' ? 'https' : 'http';
