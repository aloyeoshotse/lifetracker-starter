\echo 'Delete and recreate life-tracker database?'
\prompt 'Return for yes or Control + C to cancel > ' answer

DROP DATABASE life_tracker;
CREATE DATABASE life_tracker;
\connect life_tracker;

\i life-tracker-schema.sql