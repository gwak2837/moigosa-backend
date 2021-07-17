SELECT id,
  password_hash
FROM "user"
WHERE email = $1;