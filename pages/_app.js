import { SearchProvider } from "../context/SearchContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
