import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Settings = () => {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      try {
        const decoded: { id: string } = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div className="h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-center text-[whitesmoke] text-2xl mt-[100px] mb-[25px]">Settings</h1>
      <div className="mb-6 border p-4 rounded shadow flex flex-col items-center gap-6">
        <button className="text-[whitesmoke] bg-[#13547a] py-3 w-full rounded m-0">Update Email</button>
        <button className="text-[whitesmoke] bg-[red] py-3 w-full rounded m-0">Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
