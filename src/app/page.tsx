
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <div className="w-[30rem] h-[15rem] mb-5" style={{
        background: `url(/illustrations/pilot.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }} />
      <h1 className="text-5xl font-bold">
        Vacation Planner
      </h1>
      <p className="text-muted-foreground">
        The perfect planner for your deserved vacation. Set trips, manage dates and more!
      </p>
    </main>
  );
}
