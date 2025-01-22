import { Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();

    return (
        <Container className="text-center m-auto fs-1 p-5 ">
            <h1>
                {error.status}
            </h1>
            <p>{error.statusText}</p>
            <Link to='/home'>If you want to back safty click here </Link>
        </Container>
    )
}
