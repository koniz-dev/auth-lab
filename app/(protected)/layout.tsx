import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-y-10 bg-radial-[ellipse_at_top] from-sky-400 to-blue-800">
            <Navbar />
            {children}
        </div>
    );
}

export default ProtectedLayout;