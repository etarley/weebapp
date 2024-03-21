CREATE TABLE `auth_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`primary_key` integer NOT NULL,
	`hashed_password` text,
	`expires` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `auth_keys` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_primary_key_idx` ON `auth_keys` (`user_id`,`primary_key`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `active_expires_idx` ON `sessions` (`active_expires`);--> statement-breakpoint
CREATE INDEX `idle_expires_idx` ON `sessions` (`idle_expires`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);