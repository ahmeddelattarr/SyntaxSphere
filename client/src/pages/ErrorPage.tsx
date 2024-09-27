import { useRouteError } from "react-router-dom"

const ErrorPage = ()=>{
    const error = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Page not found.</p>
            <p>
                {/* @ts-ignore */}
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;