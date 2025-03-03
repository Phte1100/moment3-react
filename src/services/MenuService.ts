import axios from "axios";

const API_URL = "https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

interface NewMenuItem {
  name: string;
  price: number;
  description?: string;
  category?: string;
}


const getAllMenuItems = () => axios.get<MenuItem[]>(API_URL);
const getMenuItemById = (id: string) => axios.get<MenuItem>(`${API_URL}/${id}`);
const createMenuItem = (menuItem: NewMenuItem, token: string | null) =>
  axios.post<MenuItem>(API_URL, menuItem, {
    headers: { Authorization: `Bearer ${token}` },
  });
const updateMenuItem = (id: string, menuItem: MenuItem) =>
  axios.put<MenuItem>(`${API_URL}/${id}`, menuItem);
const deleteMenuItem = (id: string) => axios.delete(`${API_URL}/${id}`);

export { getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };





//const API_URL = "https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu";