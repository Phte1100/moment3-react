import React, { useState, useEffect } from "react";
import { getAllMenuItems, deleteMenuItem } from "../services/MenuService";
import Modal from "./Modal";
import EditMenuItem from "./EditMenuItem";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

const MenuListLoggedIn: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token"); // Hämtar token från localStorage

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAllMenuItems();
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      fetchMenu(); // Uppdatera listan efter borttagning
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Pris</th>
            <th>Kategori</th>
            {token && <th>Redigera/radera</th>} {/* Visa bara "Actions" om token finns */}
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price} kr</td>
              <td>{item.category}</td>
              {token && (
                <td>
                  {/* Visa bara knappar om token finns */}
                  <button
                    className="button is-small is-info"
                    onClick={() => {
                      setSelectedItemId(item._id);
                      setIsModalOpen(true);
                    }}
                  >
                    Redigera
                  </button>
                  <button
                    className="button is-small is-danger ml-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    Radera
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal för redigering */}
      {token && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <EditMenuItem
            menuItemId={selectedItemId}
            onClose={() => setIsModalOpen(false)}
            refreshMenu={fetchMenu}
          />
        </Modal>
      )}
    </div>
  );
};

export default MenuListLoggedIn;
