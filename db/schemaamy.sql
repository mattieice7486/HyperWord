DROP DATABASE IF EXISTS scrabbleValues_db;
CREATE scrabbleValues_db;

USE scrabbleValues_db;

CREATE TABLE letters;

INSERT INTO letters(
    letter VARCHAR (1),
    points INT (2)
);

CREATE TABLE nouns;

INSERT INTO nouns(
    word VARCHAR (3, 15) NOT NULL,
    partOfSpeech VARCHAR (15) NOT NULL
);

CREATE TABLE verbs;

INSERT INTO verbs(
    word VARCHAR (3, 15) NOT NULL,
    partOfSpeech VARCHAR (15) NOT NULL
);

CREATE TABLE adverbs;

INSERT INTO adverbs(
    word VARCHAR (3, 15) NOT NULL,
    partOfSpeech VARCHAR (15) NOT NULL
);

CREATE TABLE adjectives;

INSERT INTO adjectives(
    word VARCHAR (3, 15) NOT NULL,
    partOfSpeech VARCHAR (15) NOT NULL
);

CREATE TABLE prepositions;

INSERT INTO prepositions(
    word VARCHAR (3, 15) NOT NULL,
    partOfSpeech VARCHAR (15) NOT NULL
);
