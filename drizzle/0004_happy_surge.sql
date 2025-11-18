ALTER TABLE "Customer" ALTER COLUMN "phoneNumber" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Customer" ALTER COLUMN "phoneNumber2" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Customer" ALTER COLUMN "BVN" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Customer" ALTER COLUMN "NIN" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "pin" DROP NOT NULL;