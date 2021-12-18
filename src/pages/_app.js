import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};
export default MyApp;

// import "tailwindcss/tailwind.css";
// import { Provider } from "react-redux";
// import "../styles/globals.css";
// import { Provider as AuthProvider } from "next-auth/react";
// import { SessionProvider } from "next-auth/react";
// import { store } from "../app/store";
// const MyApp = ({ Component, pageProps }) => {
//   return (
//     <AuthProvider session={pageProps.session}>
//       <Provider store={store}>
//         <Component {...pageProps} />
//       </Provider>
//     </AuthProvider>
//   );
// };

// export default MyApp;
