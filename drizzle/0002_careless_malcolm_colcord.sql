ALTER TABLE "Customer" ADD COLUMN "creator_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_creator_id_User_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");