import LoginButton from "../components/Login.jsx";

export const LandingPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1>Build Custom Voice AI Agents</h1>
          </div>
          <div className="col-12 text-center">
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
};
