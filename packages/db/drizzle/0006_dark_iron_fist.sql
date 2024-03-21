DROP INDEX IF EXISTS `user_id_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `active_expires_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `idle_expires_idx`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `active_expires`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `idle_expires`;