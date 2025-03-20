import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { createMenuItem } from "../services/MenuService";

const schema = yup.object().shape({
  name: yup.string().required("Namn är obligatoriskt"),
  description: yup.string(),
  price: yup.number().positive("Pris måste vara större än 0").required("Pris är obligatoriskt"),
  category: yup.string().required("Kategori är obligatoriskt"),
});

const AddMenuItem = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createMenuItem(data, token);
      navigate("/");
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
  };

  return (
    <div>
      <h2 className="title is-4">Lägg till i menyn</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Namn</label>
          <input {...register("name")} className="input" placeholder="Namn på skapelsen" />
          {errors.name && <p className="has-text-danger">{errors.name.message}</p>}
        </div>

        <div className="field">
          <label className="label">Beskrivning</label>
          <input {...register("description")} className="input" placeholder="Beskrivning" />
        </div>

        <div className="field">
          <label className="label">Pris</label>
          <input {...register("price")} className="input" type="number" />
          {errors.price && <p className="has-text-danger">{errors.price.message}</p>}
        </div>

        <div className="field">
          <label className="label">Kategori</label>
          <input {...register("category")} className="input" placeholder="Kategori" />
          {errors.category && <p className="has-text-danger">{errors.category.message}</p>}
        </div>

        <button type="submit" className="button is-primary is-fullwidth">Lägg till</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
