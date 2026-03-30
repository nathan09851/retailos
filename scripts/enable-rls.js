// Enable RLS on all Supabase tables
// Usage: Set DIRECT_URL env variable, then run: node scripts/enable-rls.js
// Or run the SQL in prisma/migrations/enable_rls.sql directly in the Supabase SQL Editor.

const { PrismaClient } = require('@prisma/client');

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) {
  console.error('ERROR: Set DIRECT_URL or DATABASE_URL environment variable.');
  process.exit(1);
}

const prisma = new PrismaClient({
  datasources: { db: { url } },
});

const tables = [
  'User', 'Product', 'Customer', 'Order', 'Transaction',
  'AIInsight', 'AIChat', 'Report', 'ReportSchedule', 'FinancialEvent'
];

async function enableRLS() {
  console.log('Connecting...');
  await prisma.$queryRaw`SELECT 1`;
  console.log('Connected!\n');

  console.log('Enabling RLS on all tables...\n');
  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE public."${table}" ENABLE ROW LEVEL SECURITY`);
      console.log(`  + RLS enabled on "${table}"`);
    } catch (err) {
      console.error(`  x Failed on "${table}":`, err.message);
    }
  }

  console.log('\nCreating service_role policies...\n');
  for (const table of tables) {
    const policyName = `service_role_all_${table.toLowerCase()}`;
    try {
      await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "${policyName}" ON public."${table}"`);
      await prisma.$executeRawUnsafe(
        `CREATE POLICY "${policyName}" ON public."${table}" FOR ALL TO service_role USING (true) WITH CHECK (true)`
      );
      console.log(`  + Policy "${policyName}" created on "${table}"`);
    } catch (err) {
      console.error(`  x Policy failed on "${table}":`, err.message);
    }
  }

  console.log('\nDone! All tables secured.');
  await prisma.$disconnect();
}

enableRLS().catch(async e => {
  console.error('FATAL:', e);
  await prisma.$disconnect();
  process.exit(1);
});
