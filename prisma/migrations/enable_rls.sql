-- Enable Row Level Security on all public tables
-- Prisma connects as the database owner (postgres), which bypasses RLS.
-- This protects tables from unauthorized access via Supabase's PostgREST (anon key).

ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Transaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AIInsight" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AIChat" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Report" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ReportSchedule" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."FinancialEvent" ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for the service_role (used by our backend API routes)
-- The postgres owner already bypasses RLS, but the service_role needs explicit policies.

CREATE POLICY "service_role_all_user" ON public."User" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_product" ON public."Product" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_customer" ON public."Customer" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_order" ON public."Order" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_transaction" ON public."Transaction" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_aiinsight" ON public."AIInsight" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_aichat" ON public."AIChat" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_report" ON public."Report" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_reportschedule" ON public."ReportSchedule" FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_financialevent" ON public."FinancialEvent" FOR ALL TO service_role USING (true) WITH CHECK (true);
