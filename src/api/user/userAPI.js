import { DEFAULT_URL } from "../../resource/constants";

const USERS_DEFAULT_URL = DEFAULT_URL + "users";
/**
 * Adds a user to the database, if the user already exists
 * this function wont run. Throws an error if there was something wrong 
 * with the database.
 * @param {*} data 
 */
export async function postUserData(data) {
    fetch(USERS_DEFAULT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
/**
 * Retrieves a user based on the name param. If something went wrong with the
 * database an error is thrown, else returns the user.
 * 
 * @param {*} name the name of the user to be retrieved.
 * @returns the user with the specified name.
 */
export async function getUserData(name) {
    try {
        const response = (await fetch(USERS_DEFAULT_URL + "?name=" + name));
        const user = (await response.json());
        return user;
    } catch (error) {
        console.log("Error: ", error)
    }
}