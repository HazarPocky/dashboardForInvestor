import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ntuianxmyihoouqzamfr.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkMzBkNTk1LWFlMTMtNDljYS1hZWQ5LWMwYTdiMWVkZWIzYiJ9.eyJwcm9qZWN0SWQiOiJudHVpYW54bXlpaG9vdXF6YW1mciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc0MDMwMTgzLCJleHAiOjIwODkzOTAxODMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.5odVxOC7lwOgRnjd1bpoL7vxbge8hDtAtL1VbQ_76f8';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };