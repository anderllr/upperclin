import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import "./firebase/firebase";
import App from "./containers/App";

export const store = configureStore();

const BASE_URL = "http://192.168.1.109:3002/upperql";
const uploadLink = createUploadLink({ uri: BASE_URL });

const cache = new InMemoryCache();

const middlewareAuth = setContext(async (req, { headers }) => {
	//TODO Change temporaly token that puted to
	//	const token = await getToken();
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjgxNjVhZDUyZTdiZjJiM2M0ZDRhYjgiLCJpYXQiOjE1MzUyMDY5MzN9.U9oH3ZfTOEo3-Cj3lWJD1QFDT6Hf1-eELBluIUgSVh4";
	return {
		...headers,
		headers: {
			authorization: token ? `Bearer ${token}` : null
		}
	};
});
const httpLinkAuth = middlewareAuth.concat(uploadLink);

const client = new ApolloClient({
	link: httpLinkAuth,
	cache
});

const MainApp = () => (
	<Provider store={store}>
		<ApolloProvider client={client}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</ConnectedRouter>
		</ApolloProvider>
	</Provider>
);

export default MainApp;
