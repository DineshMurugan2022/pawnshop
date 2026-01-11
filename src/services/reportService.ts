import { supabase } from '../lib/supabase';
import type {
    DetailReportRow,
    CustomerPledgeReportRow,
    Pledge,
    Customer,
    BankPledge,
    PledgeSale
} from '../types/pawnshop';

export type DateRange = {
    start_date: string;
    end_date: string;
};

export const getDetailReport = async (range: DateRange): Promise<DetailReportRow[]> => {
    const { data: pledges, error } = await supabase
        .from('pledges')
        .select(`
            id,
            pledge_number,
            pledge_date,
            loan_amount,
            interest_rate,
            status,
            customer:customers (
                full_name,
                phone
            ),
            part_payments (
                principal_paid,
                interest_paid
            )
        `)
        .gte('pledge_date', range.start_date)
        .lte('pledge_date', range.end_date)
        .order('pledge_date', { ascending: false });

    if (error) throw error;

    return (pledges as any[]).map(pledge => {
        const totalPrincipalPaid = pledge.part_payments?.reduce((sum: number, p: any) => sum + (p.principal_paid || 0), 0) || 0;
        const totalInterestPaid = pledge.part_payments?.reduce((sum: number, p: any) => sum + (p.interest_paid || 0), 0) || 0;

        // Simple calculation for interest amount (this should be replaced by actual accrual logic)
        // For now, returning interest paid as "interest amount" so far, or simple calculation
        const interestAmount = totalInterestPaid;

        return {
            pledge_number: pledge.pledge_number,
            pledge_date: pledge.pledge_date,
            customer_name: pledge.customer?.full_name || 'Unknown',
            customer_phone: pledge.customer?.phone || '',
            loan_amount: pledge.loan_amount,
            interest_amount: interestAmount,
            total_paid: totalPrincipalPaid + totalInterestPaid,
            outstanding: pledge.loan_amount - totalPrincipalPaid,
            status: pledge.status
        };
    });
};

export const getCustomerPledgeReport = async (range: DateRange): Promise<CustomerPledgeReportRow[]> => {
    // This is more complex as we need to group by customer.
    // Fetch all pledges in range + active ones maybe? 
    // Usually reports are strict on date range.

    const { data: pledges, error } = await supabase
        .from('pledges')
        .select(`
            loan_amount,
            pledge_date,
            status,
            customer:customers (
                customer_code,
                full_name
            ),
            part_payments (
                principal_paid
            )
        `)
        .gte('pledge_date', range.start_date)
        .lte('pledge_date', range.end_date);

    if (error) throw error;

    const customerMap = new Map<string, CustomerPledgeReportRow>();

    (pledges as any[]).forEach(pledge => {
        const customerName = pledge.customer?.full_name || 'Unknown';
        const customerCode = pledge.customer?.customer_code || 'N/A';
        const key = customerCode;

        if (!customerMap.has(key)) {
            customerMap.set(key, {
                customer_code: customerCode,
                customer_name: customerName,
                total_pledges: 0,
                total_loan_amount: 0,
                total_outstanding: 0,
                last_pledge_date: pledge.pledge_date
            });
        }

        const entry = customerMap.get(key)!;
        entry.total_pledges += 1;
        entry.total_loan_amount += pledge.loan_amount;

        const principalPaid = pledge.part_payments?.reduce((sum: number, p: any) => sum + (p.principal_paid || 0), 0) || 0;
        entry.total_outstanding += (pledge.loan_amount - principalPaid);

        if (new Date(pledge.pledge_date) > new Date(entry.last_pledge_date)) {
            entry.last_pledge_date = pledge.pledge_date;
        }
    });

    return Array.from(customerMap.values());
};

// Placeholder for Bank Pledge Report
export const getBankPledgeReport = async (range: DateRange): Promise<any[]> => {
    const { data, error } = await supabase
        .from('bank_pledges')
        .select(`
            *,
            pledge:pledges (
                pledge_number,
                loan_amount
            ),
            bank:bank_master (
                bank_name
            )
        `)
        .gte('sent_date', range.start_date)
        .lte('sent_date', range.end_date);

    if (error) throw error;
    return data || [];
};

// Placeholder for Sales Report
export const getPledgeSalesReport = async (range: DateRange): Promise<any[]> => {
    const { data, error } = await supabase
        .from('pledge_sales')
        .select(`
            *,
            pledge:pledges (
                pledge_number,
                loan_amount
            )
        `)
        .gte('sale_date', range.start_date)
        .lte('sale_date', range.end_date);

    if (error) throw error;
    return data || [];
};
