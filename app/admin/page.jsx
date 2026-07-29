import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin | DreamAndScale",
  description: "DreamAndScale operations dashboard.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
