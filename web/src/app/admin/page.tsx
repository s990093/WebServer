require("dotenv").config();
export const DJANGO_IP = process.env.NEXT_PUBLIC_DJANGO_IP || "192.168.0.135";
export const DJANGO_PORT = process.env.NEXT_PUBLIC_DJANGO_PORT || "8000";

const AdminPage = () => {
  return (
    <div className="min-h-screen">
      <iframe
        src="http://localhost:8000/admin/"
        className="w-full h-[100vh] border-none"
        title="Django Admin"
        sandbox="allow-same-origin allow-scripts" // 允许脚本和同源内容
      />
    </div>
  );
};

export default AdminPage;
