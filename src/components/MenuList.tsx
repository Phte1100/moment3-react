import React, { useState, useEffect } from "react";
import { getAllMenuItems } from "../services/MenuService";
import { Link, NavLink } from "react-router-dom";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAllMenuItems();
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title">Meny</h2>

      {loading ? (
        <p className="loading">Hämtar data...</p>
      ) : (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Pris</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price} kr</td>
                <td>
                  {/* Länk till DetailPage för att visa enskild meny */}
                  <NavLink to={`/menu/${item._id}`} className="button is-info">
                    Mer information
                  </NavLink>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      )}
    </>
  );
};

export default MenuList;
