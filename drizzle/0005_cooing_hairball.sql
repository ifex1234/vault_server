ALTER TABLE "Customer" DROP CONSTRAINT "Customer_creator_id_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Customer" ALTER COLUMN "BVN" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Customer" ALTER COLUMN "NIN" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_creator_id_User_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;