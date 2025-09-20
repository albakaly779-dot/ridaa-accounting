-- journal_entries and journal_lines (minimal)
CREATE TABLE IF NOT EXISTS journal_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  description_ar TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_lines (
  id SERIAL PRIMARY KEY,
  journal_entry_id INTEGER REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_id INTEGER,
  debit NUMERIC(18,2) DEFAULT 0,
  credit NUMERIC(18,2) DEFAULT 0,
  narration TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
