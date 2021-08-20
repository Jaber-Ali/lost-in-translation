import { useState } from "react";
import { postTextData } from "../../api/translation/translationAPI";
import Sign from "./Sign";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useEffect } from "react";
import { getStorage } from "../../storage";
import { useHistory } from "react-router-dom";
import { getUserData } from "../../api/user/userAPI";

const Translation = (props) => {

    const [words, setWords] = useState("");
    const [symbols, setSymbols] = useState([]);
    const DEFAULT_PATH = `${process.env.PUBLIC_URL}/assets/images/`
    const history = useHistory();

    /**
     * Runs first time this page opens, 
     * and when the username gets updated 
     * (when the user logs out on this page).
     */
    useEffect(() => {
        if (!getStorage("username")) {
            history.push('/');
        } else {
            props.handleTitle("Translation");
        }
    }, [props.user])

    const translateButtonClick = () => {
        sendData();
    }

/**
* Checks if the user has entered the right number
* of characters.
*/
    const checkCorrectInput = () => {
        if (words.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    const handleButtonClick = event => {
        if(event.key === "Enter") {
            sendData();
        }
    }

/**
* Retrieves the id of the currently logged in user
* and adds the posted text to the database for
* that user.
*/
    async function sendData() {
        if(checkCorrectInput() === false) {
            alert("Please enter letters, more than 0 and max 40.")
        } else {
            setSymbols(words.toLowerCase().split(""));
            const userId = (await getUserData(getStorage("username")))[0].id;
            const data = {
                text: words,
                poster_id: userId
            }
            postTextData(data);
        }
    }

    const onInputChange = event => {
        setWords(event.target.value)
    }

    

    return (
        <div className="Translation">
            <div className="field-container">

            </div>
            <div className="translation-field-container">
                <div className="translation-field-info bold-text">Translation</div>
                <div className="translation-field">
                    {
                        symbols.map((s, i) => <Sign key={s + i} symbol={DEFAULT_PATH + s + ".png"} />)
                    }
                </div>
                <footer className="translation-field-footer">
                    <div className="text-field-container">
                        <span className="input-symbol">⌨|</span>
                        <input id="words" className="text-size-m input-text-field" placeholder="Enter a text to be translated (Max 40 letters)" maxLength="40" onKeyDown={handleButtonClick} onChange={onInputChange}></input>
                        <button id="text-button" className="input-button bold-text" onClick={translateButtonClick}>GO</button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Translation;
