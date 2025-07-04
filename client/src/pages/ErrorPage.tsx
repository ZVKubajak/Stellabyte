import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col text-center text-[whitesmoke] h-screen w-2/5 mx-auto justify-center">
      <h1 className="text-6xl mb-3">Whoops!</h1>
      <p className="text-4xl mb-12">It seems like you got lost...</p>

      <Link to="/">
        <Button className="mx-72 py-2">Return to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
