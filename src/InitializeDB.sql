CREATE TABLE lists(
    _id SERIAL PRIMARY KEY,
    name VARCHAR(96)
);
CREATE TABLE items(
    _id SERIAL PRIMARY KEY,
    description VARCHAR(256),
    checked boolean,
    listID integer REFERENCES lists (_id)
);
