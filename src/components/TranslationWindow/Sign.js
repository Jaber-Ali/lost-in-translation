const Sign = (props) => {

    return (
        <span className="Sign">
            <img className="sign-img" src={props.symbol} alt="symbol"
                onError={err => { err.target.className="fallback-img"; err.target.src = props.symbol.substring(0, props.symbol.length - 5) + "fallback.png"; }} />
        </span>
    )
}

export default Sign;