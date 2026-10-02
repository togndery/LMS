import TopNav from "../components/TopNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import "../public/css/register.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
