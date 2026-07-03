const fs = require('fs');
const content = fs.readFileSync('setup-pawnshop-db.cjs', 'utf8');
const match = content.match(/const sql = `([\s\S]*?)`;/);
if (match) {
    let sql = match[1];
    sql += `\nINSERT INTO public.metal_rates (metal_type, rate_per_gram, effective_date) VALUES ('gold', 10200, CURRENT_DATE), ('silver', 300, CURRENT_DATE) ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.companies (company_name, branch_name, address, city, state, phone, language_preference) VALUES ('Sri Lakshmi Pawn Brokers', 'Main Branch', '123 Main Street', 'Chennai', 'Tamil Nadu', '9876543210', 'en') ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.loan_types (loan_type_name, description) VALUES ('Gold Loan', 'Loan against gold jewelry'), ('Silver Loan', 'Loan against silver items'), ('Diamond Loan', 'Loan against diamond jewelry') ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.jewellery_types (jewellery_type_name, description) VALUES ('Gold Chain', 'Gold chain'), ('Gold Ring', 'Gold ring'), ('Gold Bangle', 'Gold bangle'), ('Silver Anklet', 'Silver anklet'), ('Diamond Ring', 'Diamond ring') ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.schemes (scheme_name, interest_rate, interest_type, redemption_period_days, description) VALUES ('Standard Gold Loan', 2.0, 'monthly', 365, 'Standard gold loan with 2% monthly interest'), ('Premium Scheme', 1.5, 'monthly', 180, 'Premium scheme with lower interest'), ('Quick Loan', 2.5, 'monthly', 90, 'Quick loan for short term needs') ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.bank_master (bank_name, branch_name, account_number, ifsc_code) VALUES ('State Bank of India', 'T Nagar Branch', '1234567890', 'SBIN0001234') ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.app_users (username, password_hash, full_name, role, email) VALUES ('admin', '$2a$10$rKvVPZqGvqKvJVJvJvJvJeN9N9N9N9N9N9N9N9N9N9N9N9N9N9N9N', 'Administrator', 'admin', 'admin@pawnshop.com') ON CONFLICT DO NOTHING;\n`;
    fs.writeFileSync('schema.sql', sql);
}
