import OverviewCards from '../components/Dashboard/OverviewCards';
import TrendChart from '../components/Dashboard/TrendChart';
import CategoryChart from '../components/Dashboard/CategoryChart';

export default function DashboardPage() {
  return (
    <div className="space-y-5  animate-fade-in  bg-black rounded-2xl ">
      <section className='mx-4 flex flex-col items-center'>
        {/* Overview Cards */}
          <h2 className="text-3xl mt-20 pt-4 mb-2 font-semibold text-emerald-400 ">Summary</h2>
          <OverviewCards />

        {/* Charts Grid */}
        <section className='flex flex-col items-center'>
          <div className="my-4">
            <h2 className="text-3xl font-semibold text-emerald-400">Analytics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TrendChart />
            <CategoryChart />
          </div>
        </section>
      </section>
    </div>
  );
}
