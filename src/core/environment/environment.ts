import { env } from 'process';
import { Environment } from '../interfaces';
import { config } from 'dotenv';
import { LOGGER_TYPE } from '../constants';

config();

export const environment: Environment = {
	databaseConfig: {
		databaseUser: env.DATABASE_USER,
		databasePassword: env.DATABASE_PASSWORD,
		databaseName: env.DATABASE_NAME,
		databaseHost: env.DATABASE_HOST
	},

	mailerConfig: {
		host: env.MAILER_HOST,
		port: Number(env.MAILER_PORT),
		secure: JSON.parse(env.MAILER_SECURE),
		auth: {
			user: env.MAILER_USER,
			pass: env.MAILER_PASS
		}
	},

	winstonConfig: {
		format: env.LOGGER_FORMAT,
		appName: env.LOGGER_APP_NAME,
		listLoggerConfig: [
			{
				filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_INFO}`,
				datePattern: env.LOGGER_DATE_PATTERN,
				zippedArchive: JSON.parse(env.LOGGER_ZIPPED_ARCHIVE),
				watchLog: JSON.parse(env.LOGGER_WATCH_LOG),
				maxSize: env.LOGGER_MAX_SIZE,
				maxFiles: env.LOGGER_MAX_FILES,
				level: LOGGER_TYPE.INFO
			},
			{
				filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_WARN}`,
				datePattern: env.LOGGER_DATE_PATTERN,
				zippedArchive: JSON.parse(env.LOGGER_ZIPPED_ARCHIVE),
				watchLog: JSON.parse(env.LOGGER_WATCH_LOG),
				maxSize: env.LOGGER_MAX_SIZE,
				maxFiles: env.LOGGER_MAX_FILES,
				level: LOGGER_TYPE.WARN
			},
			{
				filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_ERROR}`,
				datePattern: env.LOGGER_DATE_PATTERN,
				zippedArchive: JSON.parse(env.LOGGER_ZIPPED_ARCHIVE),
				watchLog: JSON.parse(env.LOGGER_WATCH_LOG),
				maxSize: env.LOGGER_MAX_SIZE,
				maxFiles: env.LOGGER_MAX_FILES,
				level: LOGGER_TYPE.ERROR
			}
		]
	},

	logstashConfig: {
		port: Number(env.LOGSTASH_PORT),
		enable: JSON.parse(env.LOGSTASH_ENABLE),
		node_name: env.LOGSTASH_NODE_NAME,
		host: env.LOGSTASH_HOST,
		max_connect_retries: Number(env.LOGSTASH_MAX_CONNECT_RETRIES)
	}
};
