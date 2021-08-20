import { DEFAULT_URL } from "../../resource/constants";
const TEXT_DEFAULT_URL = DEFAULT_URL + "searches";
/**
* Posts data to the database, the param will always
* be an object with a post and poster id
* or throws an error if something went wrong with the
* "backend".
*/
export async function postTextData(text) {
    try {
        const response = await fetch(TEXT_DEFAULT_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(text)
        });
        return response.json;
    } catch (error) {
        console.log(error);
    }
}
/**
* Fetches all posts made by all users,
* or throws an error if something went wrong with the
* "backend".
*/
export async function getTextData() {
    try {
        const response = await fetch(TEXT_DEFAULT_URL);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


/**
* Fetches posts made by a specific user
* or throws an error if something went wrong with the
* "backend".
*/
export async function getTextDataWithId(id, limit = 0) {
    try {
        const url = TEXT_DEFAULT_URL + "?poster_id=" + id + ((limit > 0) ? "&_limit=" + limit : "");
        const response = await fetch(url);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.log(error);
    }
}

/**
* Deletes a specified post, the param will always
* be an id for the post that needs to be deleted
* or throws an error if something went wrong with the
* "backend".
*/
export async function deleteTextData(id) {
    try {
        const response = await fetch(TEXT_DEFAULT_URL + "/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.json;
    } catch (error) {
        console.log(error);
    }
}
