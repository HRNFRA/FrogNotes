import { ConflictError, UnauthorizedError } from "../errors/httpErrors";
import { User } from "../models/user";

const BASE_URL = "https://frognotes-api.onrender.com"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage)
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage)
        } else {
            throw Error(errorMessage)
        } 
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(`${BASE_URL}/api/users`, {method: "GET", credentials: "include"})
    return response.json()
}

export interface SignupCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignupCredentials): Promise<User> {
    const response = await fetchData(`${BASE_URL}/api/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(`${BASE_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout() {
    await fetchData(`${BASE_URL}/api/users/logout`, {method: "POST", credentials: "include"})
}