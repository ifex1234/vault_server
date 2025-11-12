-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"email" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"password" text NOT NULL,
	"pin" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"email" text,
	"address" text,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"otherName" text NOT NULL,
	"customerAddress" text,
	"customerBusinessAddress" text,
	"phoneNumber" integer,
	"BVN" integer,
	"NIN" integer,
	"customerDOB" timestamp(3),
	"utilityBillUrl" text,
	"identificationUrl" text,
	"creatorEmail" text,
	"nuban" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Customer_BVN_key" ON "Customer" USING btree ("BVN" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Customer_NIN_key" ON "Customer" USING btree ("NIN" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Customer_nuban_key" ON "Customer" USING btree ("nuban" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Customer_phoneNumber_key" ON "Customer" USING btree ("phoneNumber" int4_ops);
*/