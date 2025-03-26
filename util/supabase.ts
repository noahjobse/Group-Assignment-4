import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xowuvckgqadrvhvjrtut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvd3V2Y2tncWFkcnZodmpydHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTY0NzYsImV4cCI6MjA1ODQ5MjQ3Nn0.-gmkzKdgnBw_YQxPjxm867ivRxF16xnQSQTHViZUFa0'; // replace with full anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
