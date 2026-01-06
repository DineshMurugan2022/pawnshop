import { supabase } from '../lib/supabase';
import type {
    MetalRate, Company, LoanType, JewelleryType, Scheme, BankMaster, AppUser,
    Customer, CustomerFormData, Pledge, PledgeFormData, PledgeItem,
    AdditionalPledge, PartPayment, PledgeReturn, PledgeSale,
    BankPledge, BankPledgeReceive, CashTransaction, DashboardStats
} from '../types/pawnshop';

// ============================================
// METAL RATES
// ============================================

export const getMetalRates = async (): Promise<MetalRate[]> => {
    const { data, error } = await supabase
        .from('metal_rates')
        .select('*')
        .order('effective_date', { ascending: false })
        .limit(10);

    if (error) throw error;
    return data || [];
};

export const getCurrentMetalRates = async (): Promise<{ gold: number; silver: number }> => {
    const { data, error } = await supabase
        .from('metal_rates')
        .select('*')
        .eq('effective_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false });

    if (error) throw error;

    const gold = data?.find(r => r.metal_type === 'gold')?.rate_per_gram || 0;
    const silver = data?.find(r => r.metal_type === 'silver')?.rate_per_gram || 0;

    return { gold, silver };
};

export const updateMetalRate = async (metalType: 'gold' | 'silver', rate: number): Promise<void> => {
    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase
        .from('metal_rates')
        .upsert({
            metal_type: metalType,
            rate_per_gram: rate,
            effective_date: today
        }, {
            onConflict: 'metal_type,effective_date'
        });

    if (error) throw error;
};

// ============================================
// MASTER DATA - COMPANIES
// ============================================

export const getCompanies = async (): Promise<Company[]> => {
    const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

export const createCompany = async (company: Partial<Company>): Promise<Company> => {
    const { data, error } = await supabase
        .from('companies')
        .insert(company)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateCompany = async (id: string, company: Partial<Company>): Promise<void> => {
    const { error } = await supabase
        .from('companies')
        .update(company)
        .eq('id', id);

    if (error) throw error;
};

export const deleteCompany = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ============================================
// MASTER DATA - LOAN TYPES
// ============================================

export const getLoanTypes = async (): Promise<LoanType[]> => {
    const { data, error } = await supabase
        .from('loan_types')
        .select('*')
        .eq('is_active', true)
        .order('loan_type_name');

    if (error) throw error;
    return data || [];
};

export const createLoanType = async (loanType: Partial<LoanType>): Promise<LoanType> => {
    const { data, error } = await supabase
        .from('loan_types')
        .insert(loanType)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateLoanType = async (id: string, loanType: Partial<LoanType>): Promise<void> => {
    const { error } = await supabase
        .from('loan_types')
        .update(loanType)
        .eq('id', id);

    if (error) throw error;
};

export const deleteLoanType = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('loan_types')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ============================================
// MASTER DATA - JEWELLERY TYPES
// ============================================

export const getJewelleryTypes = async (): Promise<JewelleryType[]> => {
    const { data, error } = await supabase
        .from('jewellery_types')
        .select('*')
        .eq('is_active', true)
        .order('jewellery_type_name');

    if (error) throw error;
    return data || [];
};

export const createJewelleryType = async (jewelleryType: Partial<JewelleryType>): Promise<JewelleryType> => {
    const { data, error } = await supabase
        .from('jewellery_types')
        .insert(jewelleryType)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateJewelleryType = async (id: string, jewelleryType: Partial<JewelleryType>): Promise<void> => {
    const { error } = await supabase
        .from('jewellery_types')
        .update(jewelleryType)
        .eq('id', id);

    if (error) throw error;
};

export const deleteJewelleryType = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('jewellery_types')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ============================================
// MASTER DATA - SCHEMES
// ============================================

export const getSchemes = async (): Promise<Scheme[]> => {
    const { data, error } = await supabase
        .from('schemes')
        .select('*')
        .eq('is_active', true)
        .order('scheme_name');

    if (error) throw error;
    return data || [];
};

export const createScheme = async (scheme: Partial<Scheme>): Promise<Scheme> => {
    const { data, error } = await supabase
        .from('schemes')
        .insert(scheme)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateScheme = async (id: string, scheme: Partial<Scheme>): Promise<void> => {
    const { error } = await supabase
        .from('schemes')
        .update(scheme)
        .eq('id', id);

    if (error) throw error;
};

export const deleteScheme = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('schemes')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ============================================
// MASTER DATA - BANKS
// ============================================

export const getBanks = async (): Promise<BankMaster[]> => {
    const { data, error } = await supabase
        .from('bank_master')
        .select('*')
        .eq('is_active', true)
        .order('bank_name');

    if (error) throw error;
    return data || [];
};

export const createBank = async (bank: Partial<BankMaster>): Promise<BankMaster> => {
    const { data, error } = await supabase
        .from('bank_master')
        .insert(bank)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateBank = async (id: string, bank: Partial<BankMaster>): Promise<void> => {
    const { error } = await supabase
        .from('bank_master')
        .update(bank)
        .eq('id', id);

    if (error) throw error;
};

export const deleteBank = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('bank_master')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ============================================
// CUSTOMERS
// ============================================

export const getCustomers = async (searchTerm?: string): Promise<Customer[]> => {
    let query = supabase
        .from('customers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,customer_code.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

export const getCustomerById = async (id: string): Promise<Customer> => {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const createCustomer = async (customer: CustomerFormData): Promise<Customer> => {
    const { data, error } = await supabase
        .from('customers')
        .insert(customer)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateCustomer = async (id: string, customer: Partial<CustomerFormData>): Promise<void> => {
    const { error } = await supabase
        .from('customers')
        .update(customer)
        .eq('id', id);

    if (error) throw error;
};

// ============================================
// PLEDGES
// ============================================

export const getPledges = async (status?: string): Promise<Pledge[]> => {
    let query = supabase
        .from('pledges')
        .select(`
      *,
      customer:customers(*),
      scheme:schemes(*),
      loan_type:loan_types(*)
    `)
        .order('created_at', { ascending: false });

    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

export const getPledgeById = async (id: string): Promise<Pledge> => {
    const { data, error } = await supabase
        .from('pledges')
        .select(`
      *,
      customer:customers(*),
      scheme:schemes(*),
      loan_type:loan_types(*),
      items:pledge_items(*)
    `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const createPledge = async (pledgeData: PledgeFormData): Promise<Pledge> => {
    const { items, ...pledge } = pledgeData;

    // Calculate totals
    const totalWeight = items.reduce((sum, item) => sum + item.gross_weight_grams, 0);
    const totalValue = items.reduce((sum, item) => sum + (item.item_value || 0), 0);

    const { data: pledgeRecord, error: pledgeError } = await supabase
        .from('pledges')
        .insert({
            ...pledge,
            total_weight_grams: totalWeight,
            total_items: items.length,
            appraised_value: totalValue
        })
        .select()
        .single();

    if (pledgeError) throw pledgeError;

    // Insert items
    const itemsWithPledgeId = items.map(item => ({
        ...item,
        pledge_id: pledgeRecord.id
    }));

    const { error: itemsError } = await supabase
        .from('pledge_items')
        .insert(itemsWithPledgeId);

    if (itemsError) throw itemsError;

    return pledgeRecord;
};

// ============================================
// PART PAYMENTS
// ============================================

export const createPartPayment = async (payment: Partial<PartPayment>): Promise<PartPayment> => {
    const { data, error } = await supabase
        .from('part_payments')
        .insert(payment)
        .select()
        .single();

    if (error) throw error;

    // Update pledge status
    await supabase
        .from('pledges')
        .update({ status: 'partially_paid' })
        .eq('id', payment.pledge_id);

    return data;
};

export const getPartPayments = async (pledgeId: string): Promise<PartPayment[]> => {
    const { data, error } = await supabase
        .from('part_payments')
        .select('*')
        .eq('pledge_id', pledgeId)
        .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
};

// ============================================
// PLEDGE RETURNS
// ============================================

export const createPledgeReturn = async (returnData: Partial<PledgeReturn>): Promise<PledgeReturn> => {
    const { data, error } = await supabase
        .from('pledge_returns')
        .insert(returnData)
        .select()
        .single();

    if (error) throw error;

    // Update pledge status to closed
    await supabase
        .from('pledges')
        .update({ status: 'closed' })
        .eq('id', returnData.pledge_id);

    return data;
};

// ============================================
// DASHBOARD STATS
// ============================================

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const today = new Date().toISOString().split('T')[0];

    // Get active pledges count and total amount
    const { data: activePledges } = await supabase
        .from('pledges')
        .select('loan_amount')
        .in('status', ['active', 'partially_paid']);

    const totalActivePledges = activePledges?.length || 0;
    const totalLoanAmount = activePledges?.reduce((sum, p) => sum + p.loan_amount, 0) || 0;

    // Get total customers
    const { count: totalCustomers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

    // Get today's pledges
    const { count: todayPledges } = await supabase
        .from('pledges')
        .select('*', { count: 'exact', head: true })
        .eq('pledge_date', today);

    // Get today's returns
    const { count: todayReturns } = await supabase
        .from('pledge_returns')
        .select('*', { count: 'exact', head: true })
        .eq('return_date', today);

    // Get cash in hand (simplified - you may want more complex logic)
    const { data: cashTransactions } = await supabase
        .from('cash_transactions')
        .select('transaction_type, amount');

    const cashInHand = cashTransactions?.reduce((sum, t) => {
        return t.transaction_type === 'cash_in' ? sum + t.amount : sum - t.amount;
    }, 0) || 0;

    // Get current metal rates
    const { gold, silver } = await getCurrentMetalRates();

    return {
        total_active_pledges: totalActivePledges,
        total_loan_amount: totalLoanAmount,
        total_customers: totalCustomers || 0,
        today_pledges: todayPledges || 0,
        today_returns: todayReturns || 0,
        cash_in_hand: cashInHand,
        gold_rate: gold,
        silver_rate: silver
    };
};
