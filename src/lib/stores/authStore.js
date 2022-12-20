import { postFetch, getFetch } from "$lib/fetch";

const url = import.meta.env.VITE_URL;

import { writable } from 'svelte/store';
import { browser } from "$app/environment"

let user = writable({
    authenticated: false,
    role: null
})
if (browser) {

    user = writable(JSON.parse(sessionStorage.getItem('user')) || {
        authenticated: false,
        role: null
    })
}


async function login(id, username, password, role) {
    const credentials = {
        username: username.toLowerCase(),
        password: password,
    };

    const formData = new FormData();

    for (let key in credentials) {
        formData.append(key, credentials[key]);
    }

    let data;

    if (role === "user") {
        formData.append("restaurant_id", id);
        data = await postFetch(`${url}/api/login`, formData);

    } else if (role === "admin") {
        formData.append("brand_id", id);
        data = await postFetch(`${url}/api/login/admin`, formData)
    } else if (role === "superadmin") {
        data = await postFetch(`${url}/api/login/superadmin`, formData)

    }

    // Perform authentication

    if (data.message === "LOGGED_IN") {
        if (role === "user") {
            user.set({ authenticated: true, role: 'user' });
        }
        else if (role === "admin") {
            user.set({ authenticated: true, role: 'admin' });

        } else if (role === "superadmin") {
            user.set({ authenticated: true, role: 'superadmin' })
        }

        if (browser) {
            user.subscribe(value => {
                sessionStorage.setItem('user', JSON.stringify({
                    "authenticated": value.authenticated,
                    "role": value.role
                }));
            })
        }
    }

    return data;
}

async function logout() {
    const data = await getFetch(`${url}/api/logout`);

    user.set({ authenticated: false, role: null });

    if (browser) {
        sessionStorage.removeItem('user');
    }

}

function hasRole(requiredRole) {
    return user.role === requiredRole;
}

export const authStore = {
    subscribe: user.subscribe,
    login,
    logout,
    hasRole
};

// function createAuthStore() {
//     const initialAuthState = {
//         isAuthenticated: false,
//         user: null
//     }
//     async function isLoggedIn() {

//         const isLoggedIn = await getFetch(`${url}/api/isloggedin`);

//         console.log(getFetch(`${url}/api/isloggedin`));

//         if (isLoggedIn.message === "LOGGED_IN") {
//             update((authState) => {
//                 return { ...authState, isAuthenticated: true, user: isLoggedIn.data["role"] }
//             }
//             );
//         }
//     }

//     isLoggedIn();

//     const { subscribe, set, update } = writable(initialAuthState);

//     return {
//         subscribe,
//         login: async (id, username, password) => {

//             if (initialAuthState.isAuthenticated == true) {
//                 this.logout;
//             }


//             // Perform Fetch Request to /api/login here

//             const credentials = {
//                 restaurant_id: id,
//                 username: username.toLowerCase(),
//                 password: password,
//             };

//             const formData = new FormData();

//             for (let key in credentials) {
//                 formData.append(key, credentials[key]);
//             }

//             const data = await postFetch(`${url}/api/login`, formData);

//             if (data.message === "LOGGED_IN") {
//                 localStorage.setItem(
//                     "restaurant_id",
//                     id
//                 );
//             }

//             update((authState) => {
//                 return {
//                     ...authState,
//                     isAuthenticated: true,
//                     user: null
//                 }
//             })

//             goto('/');
//         },
//         adminLogin: async (id, username, password) => {

//             if (initialAuthState.isAuthenticated == true) {
//                 this.logout;
//             }

//             // Perform Fetch Request to /api/login here

//             const credentials = {
//                 brand_id: id,
//                 username: username.toLowerCase(),
//                 password: password,
//             };

//             const formData = new FormData();

//             for (let key in credentials) {
//                 formData.append(key, credentials[key]);
//             }

//             const data = await postFetch(`${url}/api/login/admin`, formData);

//             update((authState) => {
//                 return {
//                     ...authState,
//                     isAuthenticated: true,
//                     user: null
//                 }
//             })

//             goto('/admin');
//         },
//         logout: async () => {

//             console.log("TRYING TO LOGOUT");

//             const data = await getFetch(`${url}/api/logout`);

//             update((authState) => {
//                 return {
//                     ...authState,
//                     isAuthenticated: false,
//                     user: null
//                 }
//             })

//             goto('/login');
//         },
//         checkPermissions: (permission) => {
//             return authState.isAuthenticated && authState.user.permissions.includes(permission);
//         }
//     };
// }

// export const authStore = createAuthStore();

