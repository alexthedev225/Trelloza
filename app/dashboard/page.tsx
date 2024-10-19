"use client"
import withAuth from "@/app/components/withAuth";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen">
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default withAuth(Dashboard);
