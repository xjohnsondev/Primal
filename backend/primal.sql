\echo 'Delete and recreate primal db?'
\prompt 'Return for yes or control-C to cancel > '

DROP DATABASE primal;
CREATE DATABASE primal;
\connect primal

\i primal-schema.sql
\i primal-seed.sql

primal
\echo 'Delete and recreate primal_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE primal_test;
CREATE DATABASE primal_test;
\connect primal_test

\i primal-schema.sql