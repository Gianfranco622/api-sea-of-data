import { DatabaseConfig } from '../database/database.interface';
import { LogstashConfig, WinstonConfig } from '../logger/logger-config.interface';
import { MailerConfig } from '../mailer/mailer-config.interface';

export interface Environment {
	winstonConfig: WinstonConfig;
	mailerConfig: MailerConfig;
	logstashConfig: LogstashConfig;
	databaseConfig: DatabaseConfig;
}
