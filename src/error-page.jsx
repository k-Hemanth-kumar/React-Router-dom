import { useRouteError } from "react-router-dom";

export default function ErrorCatchingPage(){
    const error=useRouteError();
    return(
        <div id="error-page">
            <h1>OOPS</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.data}</i>
            </p>
        </div>
    )
}