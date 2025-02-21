import "bootstrap/dist/css/bootstrap.min.css";

export default function SignInPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <button className="btn btn-danger w-100 mb-3">
            Iniciar sesión con Google
          </button>
          <button className="btn btn-primary w-100 mb-3">
            Iniciar sesión con GitHub
          </button>
          <button className="btn btn-info w-100 mb-3">
            Iniciar sesión con LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
