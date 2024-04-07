-- \echo 'Delete and recreate primal db?'

-- DROP DATABASE primal;
-- CREATE DATABASE primal ENCODING 'UTF8';
-- \connect primal

\i primal-schema.sql
\i primal-seed.sql

-- primal
-- \echo 'Delete and recreate primal_test db?'

-- DROP DATABASE primal_test;
-- CREATE DATABASE primal_test ENCODING 'UTF8';
-- \connect primal_test

-- \i primal-schema.sql