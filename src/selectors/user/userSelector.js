import { createSelector } from "@reduxjs/toolkit";

const userState = (state) => state.userReducer
export const userSelector = createSelector(userState, (state) => state)
export const isUserLoggedInSelector = createSelector(userState, ({isLoggedIn}) => isLoggedIn)
export const userTokenSelector = createSelector(userState, ({token}) => token)
export const tokenExpiredSelector = createSelector(userState, ({expiresIn}) => Date.now() > Date.parse(expiresIn))