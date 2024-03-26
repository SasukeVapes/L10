import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatedFundraiser from "./pages/CreatedFundraiser";
import SearchFundraiser from "./pages/SearchFundraiser";
import Navbar from "./components/Navbar";
import FundraiserDetail from "./pages/FundraiserDetail";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import QAPage from "./pages/QAPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import AdministrationPage from "./pages/AdministrationPage";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchFundraiser />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/created" element={<CreatedFundraiser />} />
            <Route path="/pimpadmin" element={<AdministrationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ss" element={<SuccessStoriesPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/fundraiser/:id" element={<FundraiserDetail />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
