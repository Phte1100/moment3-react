import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuItemById } from "../services/MenuService";

interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Hämta ID från URL
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMenuItem = async () => {
      try {
        const response = await getMenuItemById(id);
        setMenuItem(response.data);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) return <p className="loading">Hämtar data...</p>;
  if (!menuItem) return <p>Menyalternativet kunde inte hittas.</p>;

  return (
      <>
        <h2 className="title is-2">{menuItem.name}</h2>
          <div className="content">
            <p><strong>Beskrivning:</strong> {menuItem.description || "Ingen beskrivning"}</p>
            <p><strong>Pris:</strong> {menuItem.price} kr</p>
            <p><strong>Kategori:</strong> {menuItem.category || "Okänd kategori"}</p>
          </div>
      </>
  );
};

export default DetailPage;
