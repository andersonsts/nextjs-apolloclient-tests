import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  HttpLink,
  gql
} from "@apollo/client";
import fetch from "cross-fetch";

export const GET_EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const App = () => {
  const { loading, error, data } = useQuery(GET_EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

const client = new ApolloClient({ 
  link: new HttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    fetch
  }),
  cache: new InMemoryCache()
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}
