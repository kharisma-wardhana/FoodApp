import { useEffect }from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http:\\localhost:1337';

export const registerUser = (username, email, password) => {
    if (typeof window === 'undefined') return;
    
    return new Promise((resolve, reject) => {
        axios
            .post(`${URL_API}/auth/local/register`, {
                username, email, password
            })
            .then(res => {
                Cookie.set('token', res.data.jwt);
                resolve(res);
                Router.push('/');
            })
            .catch(err => {
                reject(err);
            });
    });
}

export const login = (identifier, password) => {
    if (typeof window === 'undefined') return;

    return new Promise((resolve, reject) => {
        axios
            .post(`${URL_API}/auth/local/`, {
                identifier, password
            })
            .then(res => {
                Cookies.set('token', res.data.jwt);
                resolve(res);
                Router.push('/');
            })
            .catch(err => {
                reject(err);
            });
    })
}

export const logout = () => {
    Cookies.remove('token');
    delete window.__user;
    window.localStorage.setItem('logout', Date.now());
    Router.push('/');
}

export const withAuthSync = Component => {
    const Wrapper = props => {
        const syncLogout = e => {
            if (e.key === 'logout') {
                Router.push('/auth/login');
            }
        }

        useEffect(() => {
            window.addEventListener('storage', syncLogout);
            return () => {
                window.removeEventListener('storage', syncLogout);
                window.localStorage.removeItem('logout');
            };
        }, []);

        return <Component {...props} />;
    }

    if (Component.getInitialProps) {
        Wrapper.getInitialProps = Component.getInitialProps;
    }

    return Wrapper;
}