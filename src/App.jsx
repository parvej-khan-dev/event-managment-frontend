import Event from "./Component/Events/Event";
import EventCard from "./Component/Events/EventCard";
import Navbar from "./Component/Header/Navbar";
import Sidebar from "./Component/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AUTH } from "./backend";
function App() {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const url = await axios.get(`${AUTH}/auth/login/success`);
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data._json);
    } catch (error) {
      console.log("eroor -------------", error );
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {/* <Counter /> */}
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Event />
      </div>
      {/* <h1>Hello World</h1>
      <Counter /> */}
    </>
  );
}

export default App;
