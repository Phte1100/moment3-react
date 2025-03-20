import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Användarnamn är obligatoriskt"),
  password: yup.string().min(4, "Lösenordet måste vara minst 4 tecken").required("Lösenord är obligatoriskt"),
});

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) navigate("/Cms");
  }, [user, navigate]);

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await login(data);
      navigate("/Cms");
    } catch {
      alert("Inloggningen misslyckades");
    }
  };

  return (
    <>
      <h1 className="title is-1">Logga in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="box">
        <div className="field">
          <label className="label">Användarnamn</label>
          <div className="control">
            <input {...register("username")} className="input" type="text" placeholder="Skriv in ditt användarnamn" />
          </div>
          {errors.username && <p className="has-text-danger">{errors.username.message}</p>}
        </div>

        <div className="field">
          <label className="label">Lösenord</label>
          <div className="control">
            <input {...register("password")} className="input" type="password" placeholder="Skriv in ditt lösenord" />
          </div>
          {errors.password && <p className="has-text-danger">{errors.password.message}</p>}
        </div>

        <div className="field">
          <button className="button is-primary" type="submit">Logga in</button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
