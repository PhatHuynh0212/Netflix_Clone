import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url(/404.png)" }}
    >
      <header className="absolute top-0 left-0 px-10 py-6 w-full bg-black  ">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix logo" className="h-8" />
        </Link>
      </header>
      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-bold mb-6">Lost your way?</h1>
        <p className="mb-10 text-2xl">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <Link
          to={"/"}
          className="bg-white text-black px-6 py-3 rounded text-xl font-medium hover:opacity-90"
        >
          Netflix home page
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
