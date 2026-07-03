const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    password: 'Dinesh@6702',
    host: 'db.rieyzldbygsgfiwhfdmo.supabase.co',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
});
client.connect()
    .then(() => client.query("SELECT polname, polcmd, polroles, polqual, polwithcheck FROM pg_policy WHERE polrelid = 'public.orders'::regclass;"))
    .then(res => { console.table(res.rows); return client.query("SELECT relrowsecurity FROM pg_class WHERE relname = 'orders'"); })
    .then(res => { console.log('RLS enabled:', res.rows[0]?.relrowsecurity); client.end(); })
    .catch(console.error);
