import { load } from 'ts-dotenv';

const env = load({
	DATABASE_URL: String,
	JWT_SECRET: String,
	JWT_EXPIRES_IN: String,
});

export default env;
