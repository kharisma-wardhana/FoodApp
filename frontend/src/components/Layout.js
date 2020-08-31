import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { logout } from '../lib/auth';
import AppContext from '../context/AppContext';
import {
    Container,
    Nav,
    NavItem
} from 'reactstrap';

function Layout(props) {
    const title = "Food Apps";
    const { user, setUser } = useContext(AppContext);

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0 width=device-width" />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                />
                <script src="https://js.stripe.com/v3" />
            </Head>
            <header>
                <style jsx>
                {`
                    a {
                    color: white;
                    }
                `}
                </style>
                <Nav className="navbar navbar-dark bg-dark">
                    <NavItem>
                        <Link href="/">
                            <a className="navbar-brand">Foodies</a>
                        </Link>
                    </NavItem>
                    <NavItem className="ml-auto">
                        {
                            user ? (
                                <Link href="/">
                                    <a
                                    className="nav-link"
                                    onClick={() => {
                                        logout();
                                        setUser(null);
                                    }}
                                    >
                                    Logout
                                    </a>
                                </Link>
                            ):(
                                <Link href="/auth/login">
                                    <a className="nav-link">Sign In</a>
                                </Link>
                            )
                        }
                    </NavItem>
                    <NavItem>
                        { 
                            user ? (
                                <h5>{user.username}</h5>
                            ):(
                                <Link href="/auth/register">
                                    <a className="nav-link">Sign Up</a>
                                </Link>
                            ) 
                        }
                    </NavItem>
                </Nav>
            </header>
            <Container>{props.children}</Container>
        </div>
    )
}

export default Layout;