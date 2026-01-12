import { supabase } from '../lib/supabase';
import type {
    MetalRate, Company, LoanType, JewelleryType, Scheme, BankMaster, AppUser,
    Customer, CustomerFormData, Pledge, PledgeFormData, PledgeItem,
    AdditionalPledge, PartPayment, PledgeReturn, PledgeSale,
    BankPledge, BankPledgeReceive, CashTransaction, DashboardStats
} from '../types/pawnshop';
import { mapError, handleApiError, logError } from '../utils/errorHandler';

// ============================================
// METAL RATES
// ============================================

export const getMetalRates = async (): Promise<MetalRate[]> => {
    return handleApiError(async () => {
        const { data, error } = await supabase
            .from('metal_rates')
            .select('*')
            .order('effective_date', { ascending: false })
            .limit(10);

        if (error) {
            logError(error, 'getMetalRates');
            throw error;
        }
        return data || [];
    });
};

export const getCurrentMetalRates = async (): Promise<{ gold: number; silver: number }> => {
    return handleApiError(async () => {
        const { data, error } = await supabase
            .from('metal_rates')
            .select('*')
            .eq('effective_date', new Date().toISOString().split('T')[0])
            .order('created_at', { ascending: false });

        if (error) {
            logError(error, 'getCurrentMetalRates');
            throw error;
        }

        const gold = data?.find(r => r.metal_type === 'gold')?.rate_per_gram || 0;
        const silver = data?.find(r => r.metal_type === 'silver')?.rate_per_gram || 0;

        return { gold, silver };
    });
};

export const updateMetalRate = async (metalType: 'gold' | 'silver', rate: number): Promise<void> => {
    return handleApiError(async () => {
        if (rate <= 0) {
            throw new Error('Rate must be a positive number');
        }

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

        if (error) {
            logError(error, 'updateMetalRate');
            throw error;
        }
    });
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
    return handleApiError(async () => {
        let query = supabase
            .from('customers')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (searchTerm) {
            query = query.or(`full_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,customer_code.ilike.%${searchTerm}%`);
        }

        const { data, error } = await query;

        if (error) {
            logError(error, 'getCustomers');
            throw error;
        }
        return data || [];
    });
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
    return handleApiError(async () => {
        // Validate required fields
        if (!customer.full_name || !customer.phone || !customer.address) {
            throw new Error('Full name, phone, and address are required');
        }

        const { data, error } = await supabase
            .from('customers')
            .insert(customer)
            .select()
            .single();

        if (error) {
            logError(error, 'createCustomer');
            throw error;
        }
        return data;
    });
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
    return handleApiError(async () => {
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

        if (error) {
            logError(error, 'getPledges');
            throw error;
        }
        return data || [];
    });
};

export const getPledgeById = async (id: string): Promise<Pledge> => {
    return handleApiError(async () => {
        if (!id) {
            throw new Error('Pledge ID is required');
        }

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

        if (error) {
            logError(error, 'getPledgeById');
            throw error;
        }
        return data;
    });
};

export const createPledge = async (pledgeData: PledgeFormData): Promise<Pledge> => {
    return handleApiError(async () => {
        const { items, ...pledge } = pledgeData;

        // Validate inputs
        if (!items || items.length === 0) {
            throw new Error('At least one item is required for a pledge');
        }

        // Calculate totals
        const totalWeight = items.reduce((sum, item) => sum + item.gross_weight_grams, 0);
        const totalValue = items.reduce((sum, item) => sum + (item.item_value || 0), 0);

        // Step 1: Create pledge
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

        if (pledgeError) {
            logError(pledgeError, 'createPledge - pledge creation');
            throw pledgeError;
        }

        if (!pledgeRecord) {
            throw new Error('Failed to create pledge');
        }

        // Step 2: Insert items
        const itemsWithPledgeId = items.map(item => ({
            ...item,
            pledge_id: pledgeRecord.id
        }));

        const { error: itemsError } = await supabase
            .from('pledge_items')
            .insert(itemsWithPledgeId);

        // Step 3: Rollback if items fail
        if (itemsError) {
            logError(itemsError, 'createPledge - items creation');
            // Rollback: Delete the pledge
            try {
                await supabase
                    .from('pledges')
                    .delete()
                    .eq('id', pledgeRecord.id);
            } catch (rollbackError) {
                logError(rollbackError, 'createPledge - rollback failed');
                // Log but don't throw - original error is more important
            }
            throw new Error(`Failed to create pledge items: ${itemsError.message}`);
        }

        return pledgeRecord;
    });
};

// ============================================
// PART PAYMENTS
// ============================================

export const createPartPayment = async (payment: Partial<PartPayment>): Promise<PartPayment> => {
    return handleApiError(async () => {
        if (!payment.pledge_id || !payment.payment_amount) {
            throw new Error('Pledge ID and payment amount are required');
        }

        const { data, error } = await supabase
            .from('part_payments')
            .insert(payment)
            .select()
            .single();

        if (error) {
            logError(error, 'createPartPayment');
            throw error;
        }

        // Update pledge status
        const { error: updateError } = await supabase
            .from('pledges')
            .update({ status: 'partially_paid' })
            .eq('id', payment.pledge_id);

        if (updateError) {
            logError(updateError, 'createPartPayment - update status');
        }

        return data;
    });
};

export const getPartPayments = async (pledgeId: string): Promise<PartPayment[]> => {
    return handleApiError(async () => {
        if (!pledgeId) {
            throw new Error('Pledge ID is required');
        }

        const { data, error } = await supabase
            .from('part_payments')
            .select('*')
            .eq('pledge_id', pledgeId)
            .order('payment_date', { ascending: false });

        if (error) {
            logError(error, 'getPartPayments');
            throw error;
        }
        return data || [];
    });
};

// ============================================
// PLEDGE RETURNS
// ============================================

export const createPledgeReturn = async (returnData: Partial<PledgeReturn>): Promise<PledgeReturn> => {
    return handleApiError(async () => {
        if (!returnData.pledge_id || !returnData.total_amount) {
            throw new Error('Pledge ID and total amount are required');
        }

        const { data, error } = await supabase
            .from('pledge_returns')
            .insert(returnData)
            .select()
            .single();

        if (error) {
            logError(error, 'createPledgeReturn');
            throw error;
        }

        // Update pledge status to closed
        const { error: updateError } = await supabase
            .from('pledges')
            .update({ status: 'closed' })
            .eq('id', returnData.pledge_id);

        if (updateError) {
            logError(updateError, 'createPledgeReturn - update status');
        }

        return data;
    });
};

// ============================================
// ADDITIONAL PLEDGES
// ============================================

export const createAdditionalPledge = async (additional: Partial<AdditionalPledge>): Promise<AdditionalPledge> => {
    return handleApiError(async () => {
        if (!additional.original_pledge_id || !additional.additional_amount || !additional.additional_weight_grams) {
            throw new Error('Original pledge ID, additional weight, and additional amount are required');
        }

        const { data, error } = await supabase
            .from('additional_pledges')
            .insert(additional)
            .select()
            .single();

        if (error) {
            logError(error, 'createAdditionalPledge');
            throw error;
        }

        // Update original pledge totals
        const { data: originalPledge, error: fetchError } = await supabase
            .from('pledges')
            .select('total_weight_grams, appraised_value')
            .eq('id', additional.original_pledge_id)
            .single();

        if (fetchError) {
            logError(fetchError, 'createAdditionalPledge - fetch original');
        } else if (originalPledge) {
            const { error: updateError } = await supabase
                .from('pledges')
                .update({
                    total_weight_grams: (originalPledge.total_weight_grams || 0) + (additional.additional_weight_grams || 0),
                    appraised_value: (originalPledge.appraised_value || 0) + (additional.additional_amount || 0)
                })
                .eq('id', additional.original_pledge_id);

            if (updateError) {
                logError(updateError, 'createAdditionalPledge - update totals');
            }
        }

        return data;
    });
};

export const getAdditionalPledges = async (pledgeId: string): Promise<AdditionalPledge[]> => {
    return handleApiError(async () => {
        if (!pledgeId) {
            throw new Error('Pledge ID is required');
        }

        const { data, error } = await supabase
            .from('additional_pledges')
            .select('*')
            .eq('original_pledge_id', pledgeId)
            .order('additional_date', { ascending: false });

        if (error) {
            logError(error, 'getAdditionalPledges');
            throw error;
        }
        return data || [];
    });
};

// ============================================
// PLEDGE SALES
// ============================================

export const createPledgeSale = async (sale: Partial<PledgeSale>): Promise<PledgeSale> => {
    return handleApiError(async () => {
        if (!sale.pledge_id || !sale.sale_amount) {
            throw new Error('Pledge ID and sale amount are required');
        }

        const { data, error } = await supabase
            .from('pledge_sales')
            .insert(sale)
            .select()
            .single();

        if (error) {
            logError(error, 'createPledgeSale');
            throw error;
        }

        // Update pledge status to sold
        const { error: updateError } = await supabase
            .from('pledges')
            .update({ status: 'sold' })
            .eq('id', sale.pledge_id);

        if (updateError) {
            logError(updateError, 'createPledgeSale - update status');
        }

        return data;
    });
};

export const getPledgeSales = async (pledgeId?: string): Promise<PledgeSale[]> => {
    return handleApiError(async () => {
        let query = supabase
            .from('pledge_sales')
            .select('*')
            .order('sale_date', { ascending: false });

        if (pledgeId) {
            query = query.eq('pledge_id', pledgeId);
        }

        const { data, error } = await query;

        if (error) {
            logError(error, 'getPledgeSales');
            throw error;
        }
        return data || [];
    });
};

// ============================================
// CANCELLED TRANSACTIONS
// ============================================

export const cancelTransaction = async (cancelData: Partial<CancelledTransaction>): Promise<CancelledTransaction> => {
    return handleApiError(async () => {
        if (!cancelData.transaction_type || !cancelData.transaction_id || !cancelData.reason) {
            throw new Error('Transaction type, transaction ID, and reason are required');
        }

        const { data, error } = await supabase
            .from('cancelled_transactions')
            .insert(cancelData)
            .select()
            .single();

        if (error) {
            logError(error, 'cancelTransaction');
            throw error;
        }

        return data;
    });
};

export const getCancelledTransactions = async (transactionType?: string): Promise<CancelledTransaction[]> => {
    return handleApiError(async () => {
        let query = supabase
            .from('cancelled_transactions')
            .select('*')
            .order('cancellation_date', { ascending: false });

        if (transactionType) {
            query = query.eq('transaction_type', transactionType);
        }

        const { data, error } = await query;

        if (error) {
            logError(error, 'getCancelledTransactions');
            throw error;
        }
        return data || [];
    });
};

// ============================================
// DASHBOARD STATS
// ============================================

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const today = new Date().toISOString().split('T')[0];

    // Initialize with defaults
    let totalActivePledges = 0;
    let totalLoanAmount = 0;
    let totalCustomers = 0;
    let todayPledges = 0;
    let todayReturns = 0;
    let cashInHand = 0;
    let gold = 0;
    let silver = 0;

    // Get active pledges count and total amount (with error handling)
    try {
        const { data: activePledges, error } = await supabase
            .from('pledges')
            .select('loan_amount')
            .in('status', ['active', 'partially_paid']);

        if (error) {
            logError(error, 'getDashboardStats - activePledges');
        } else {
            totalActivePledges = activePledges?.length || 0;
            totalLoanAmount = activePledges?.reduce((sum, p) => sum + (p.loan_amount || 0), 0) || 0;
        }
    } catch (error) {
        logError(error, 'getDashboardStats - activePledges');
    }

    // Get total customers (with error handling)
    try {
        const { count, error } = await supabase
            .from('customers')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true);

        if (error) {
            logError(error, 'getDashboardStats - customers');
        } else {
            totalCustomers = count || 0;
        }
    } catch (error) {
        logError(error, 'getDashboardStats - customers');
    }

    // Get today's pledges (with error handling)
    try {
        const { count, error } = await supabase
            .from('pledges')
            .select('*', { count: 'exact', head: true })
            .eq('pledge_date', today);

        if (error) {
            logError(error, 'getDashboardStats - todayPledges');
        } else {
            todayPledges = count || 0;
        }
    } catch (error) {
        logError(error, 'getDashboardStats - todayPledges');
    }

    // Get today's returns (with error handling)
    try {
        const { count, error } = await supabase
            .from('pledge_returns')
            .select('*', { count: 'exact', head: true })
            .eq('return_date', today);

        if (error) {
            logError(error, 'getDashboardStats - todayReturns');
        } else {
            todayReturns = count || 0;
        }
    } catch (error) {
        logError(error, 'getDashboardStats - todayReturns');
    }

    // Get cash in hand (with error handling)
    try {
        const { data: cashTransactions, error } = await supabase
            .from('cash_transactions')
            .select('transaction_type, amount');

        if (error) {
            logError(error, 'getDashboardStats - cashTransactions');
        } else {
            cashInHand = cashTransactions?.reduce((sum, t) => {
                return t.transaction_type === 'cash_in' 
                    ? sum + (t.amount || 0) 
                    : sum - (t.amount || 0);
            }, 0) || 0;
        }
    } catch (error) {
        logError(error, 'getDashboardStats - cashTransactions');
    }

    // Get current metal rates (with error handling)
    try {
        const rates = await getCurrentMetalRates();
        gold = rates.gold;
        silver = rates.silver;
    } catch (error) {
        logError(error, 'getDashboardStats - metalRates');
        // Use defaults (0) if error
    }

    return {
        total_active_pledges: totalActivePledges,
        total_loan_amount: totalLoanAmount,
        total_customers: totalCustomers,
        today_pledges: todayPledges,
        today_returns: todayReturns,
        cash_in_hand: cashInHand,
        gold_rate: gold,
        silver_rate: silver
    };
};
