import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { withApollo } from 'next-apollo';

const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const config = new ApolloClient({
    uri: `${URL_API}/graphql`,
    cache: new InMemoryCache()
});
  
export default withApollo(config);
