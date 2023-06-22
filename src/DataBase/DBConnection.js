let supabase;

exports.connectToDb2 = () => {
    const { createClient } = require('@supabase/supabase-js')
    supabase = createClient('https://abspredfvhebgzkulebq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFic3ByZWRmdmhlYmd6a3VsZWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3NzE3NjYsImV4cCI6MTk5NTM0Nzc2Nn0.7NFeuufQyZzet7S4ss2QrX7dZeC-1QMYuKKdZ6N-yJA')

}

exports.getSupabase = () => {
    if (!supabase) {
        this.connectToDb2();
    }
    return supabase;
}