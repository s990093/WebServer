require("dotenv").config();

const AdminPage = () => {
  const DJANGO_IP = process.env.NEXT_PUBLIC_DJANGO_IP;
  const DJANGO_PORT = process.env.NEXT_PUBLIC_DJANGO_PORT;

  return (
    <div className="min-h-screen">
      <iframe
        src={`http://${DJANGO_IP}:8000/admin/`}
        className="w-full h-[100vh] border-none"
        title="Django Admin"
        sandbox="allow-same-origin allow-scripts" // 允许脚本和同源内容
      />
    </div>
  );
};

export default AdminPage;
