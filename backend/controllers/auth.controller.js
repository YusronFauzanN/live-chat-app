import { logoutHandler, signInHandler, signUpHandler } from "../services/auth.service.js"

export const signUp = async (req, res) => {
    await signUpHandler(req, res)
}

export const signIn = async (req, res) => {
    signInHandler(req, res)
}

export const logout = async (req, res) => {
    logoutHandler(req, res)
}