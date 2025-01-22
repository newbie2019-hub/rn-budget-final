CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`created_at` integer,
	`deleted_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_category_unique` ON `categories` (`category`);--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`notes` text,
	`amount` integer NOT NULL,
	`category_id` integer NOT NULL,
	`wallet_id` integer NOT NULL,
	`created_at` integer,
	`deleted_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`wallet` text NOT NULL,
	`theme` text NOT NULL,
	`notes` text NOT NULL,
	`active_at` integer,
	`amount` integer NOT NULL,
	`created_at` integer,
	`deleted_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `wallets_wallet_unique` ON `wallets` (`wallet`);