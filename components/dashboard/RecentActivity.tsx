interface RecentActivityProps {
  data: {
    type: string;
    description: string;
    time: string;
  }[];
}

const RecentActivity = ({ data }: RecentActivityProps) => {
  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-muted-foreground">
        Recent Activity
      </h3>
      <div className="mt-4 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.type === "order" ? "bg-green-500/20" : "bg-yellow-500/20"
              }`}
            >
              {item.type === "order" ? "📦" : "⚠️"}
            </div>
            <div>
              <p className="font-semibold">{item.description}</p>
              <p className="text-sm text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
