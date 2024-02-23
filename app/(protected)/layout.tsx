import { Navbar } from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  return (
    <div
      className={`h-full w-full flex flex-col gap-y-10 justify-center items-center
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800`}
    >
      <Navbar />
      {children}
    </div>
  );
}
