CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"url" text,
	"likes" integer DEFAULT 0 NOT NULL
);
