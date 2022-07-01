CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"tasks" VARCHAR (300) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("tasks", "completed")
VALUES
	('Mop the floor', false),
	('Wash the dishes', false);