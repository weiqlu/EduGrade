import Login from "./components/Login";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      animate={{ y: -300, x: 300 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <Login />
    </motion.div>
  );
}

export default App;
