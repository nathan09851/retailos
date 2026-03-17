interface TodayAtAGlanceProps {
  data: {
    name: string;
    value: string | number;
  }[];
}

const TodayAtAGlance = ({ data }: TodayAtAGlanceProps) => {
  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-muted-foreground">
        Today at a glance
      </h3>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.name} className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">{item.name}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayAtAGlance;
