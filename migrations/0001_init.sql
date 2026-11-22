CREATE TABLE invite_codes (code TEXT PRIMARY KEY, note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, used_at TEXT, used_platform TEXT);
CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE daily_downloads (day TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0);
CREATE TABLE login_attempts (ip TEXT PRIMARY KEY, failures INTEGER NOT NULL, window_start INTEGER NOT NULL);
INSERT INTO settings (key, value) VALUES ('daily_limit', '50');
