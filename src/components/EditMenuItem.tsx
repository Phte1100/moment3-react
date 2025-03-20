import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getMenuItemById, updateMenuItem } from "../services/MenuService";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

type MenuItemFormData = Omit<MenuItem, "_id">;

interface EditMenuItemProps {
  menuItemId: string | null;
  onClose: () => void;
  refreshMenu: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Namn är obligatoriskt"),
  description: yup.string().default(""),
  price: yup.number().positive("Pris måste vara större än 0").required("Pris är obligatoriskt"),
  category: yup.string().default(""),
});

const EditMenuItem: React.FC<EditMenuItemProps> = ({ menuItemId, onClose, refreshMenu }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<MenuItemFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!menuItemId) return;

    const fetchMenuItem = async () => {
      try {
        const response = await getMenuItemById(menuItemId);
        if (response.data) {
          const { _id, ...formValues } = response.data;

          Object.keys(formValues).forEach((key) => {
            const typedKey = key as keyof MenuItemFormData;
            setValue(typedKey, formValues[typedKey] ?? (typeof formValues[typedKey] === "number" ? 0 : ""));
          });
        }
      } catch (error) {
        console.error("Error fetching menu item:", error);
      }
    };

    fetchMenuItem();
  }, [menuItemId, setValue]);

  const onSubmit = async (data: MenuItemFormData) => {
    try {
      const updatedItem: MenuItem = { _id: menuItemId!, ...data };
      await updateMenuItem(menuItemId!, updatedItem);
      refreshMenu();
      onClose();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Namn</label>
        <input {...register("name")} className="input" />
        {errors.name && <p className="has-text-danger">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label className="label">Beskrivning</label>
        <input {...register("description")} className="input" />
      </div>

      <div className="field">
        <label className="label">Pris</label>
        <input {...register("price")} className="input" type="number" />
        {errors.price && <p className="has-text-danger">{errors.price.message}</p>}
      </div>

      <div className="field">
        <label className="label">Kategori</label>
        <input {...register("category")} className="input" />
        {errors.category && <p className="has-text-danger">{errors.category.message}</p>}
      </div>

      <button className="button is-primary" type="submit">Spara ändring</button>
    </form>
  );
};

export default EditMenuItem;
