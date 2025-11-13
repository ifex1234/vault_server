DROP INDEX "Customer_nuban_key";--> statement-breakpoint
ALTER TABLE "Customer" ADD COLUMN "phoneNumber2" integer;--> statement-breakpoint
ALTER TABLE "Customer" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "Customer" DROP COLUMN "otherName";--> statement-breakpoint
ALTER TABLE "Customer" DROP COLUMN "creatorEmail";--> statement-breakpoint
ALTER TABLE "Customer" DROP COLUMN "nuban";