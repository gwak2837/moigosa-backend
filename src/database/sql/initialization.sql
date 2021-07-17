CREATE TABLE "user"(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  modification_date timestamptz NOT NULL DEFAULT NOW(),
  email VARCHAR(64) UNIQUE NOT NULL,
  password_hash VARCHAR(128) NOT NULL,
  name VARCHAR(32) NOT NULL
);

CREATE TABLE test_result (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  test_id int NOT NULL,
  --
  user_id bigint NOT NULL REFERENCES "user" ON DELETE CASCADE
);

CREATE TABLE question_answer(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  creation_date timestamptz NOT NULL DEFAULT NOW(),
  question_id int NOT NULL,
  answer int NOT NULL,
  is_correct boolean NOT NULL,
  --
  test_result_id bigint NOT NULL REFERENCES "test_result" ON DELETE CASCADE
);