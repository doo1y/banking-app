DROP TABLE IF EXISTS member,
account,
txn,
account_txn;

DROP TYPE IF EXISTS account_type,
txn_type;

CREATE TYPE account_type AS ENUM (
  -- Checking
  'C',
  -- Saving
  'S',
  -- Certificate of Deposit
  'CD',
  -- Money Market Account
  'MMA'
);

CREATE TYPE txn_type AS ENUM(
  -- Withdrawal
  'WD',
  -- Transfer
  'T',
  -- Request
  'R',
  -- Payment/Purchase
  'P'
);

CREATE TABLE member(
  id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  f_name TEXT NOT NULL,
  l_name TEXT NOT NULL,
  dob DATE NOT NULL,
  ssn TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE account(
  id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  member_id INT NOT NULL,
  account_type_code account_type NOT NULL,
  balance INT NOT NULL,
  create_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  is_open BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (member_id) REFERENCES member(id)
);

CREATE TABLE txn(
  id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
  txn_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  txn_type_code txn_type
);

CREATE TABLE account_txn(
  account_id INTEGER NOT NULL,
  txn_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account(id),
  FOREIGN KEY (txn_id) REFERENCES txn(id)
);

/**************************** DATA GENERATION *********************************/
-- Insert sample data into the member table
-- Insert sample data into the member table
INSERT INTO member (
    f_name,
    l_name,
    dob,
    ssn,
    email,
    phone,
    password_hash
  )
VALUES (
    'John',
    'Doe',
    '1990-05-15',
    '123-45-6789',
    'johndoe@example.com',
    '555-1234',
    'hashed_password_1'
  ),
  (
    'Jane',
    'Smith',
    '1985-09-22',
    '987-65-4321',
    'janesmith@example.com',
    '555-5678',
    'hashed_password_2'
  );

-- Insert sample data into the account table
INSERT INTO account (
    member_id,
    account_type_code,
    balance,
    create_at,
    is_open
  )
VALUES (1, 'C', 1000, NOW(), TRUE),
  (1, 'S', 5000, NOW(), TRUE),
  (2, 'CD', 10000, NOW(), TRUE),
  (2, 'MMA', 20000, NOW(), TRUE);

-- Insert sample data into the txn table
INSERT INTO txn (txn_date, txn_type_code)
VALUES (NOW(), 'WD'),
  (NOW(), 'T'),
  (NOW(), 'R'),
  (NOW(), 'P');

-- Insert sample data into the account_txn table
INSERT INTO account_txn (account_id, txn_id, description)
VALUES (1, 1, 'Withdrawal from checking account'),
  (2, 2, 'Transfer between savings accounts'),
  (3, 3, 'Loan request'),
  (4, 4, 'Payment for purchase');