import { useEffect, useState } from "react";
import axios from "axios";

const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/users");

        // Verifica si la respuesta tiene una propiedad 'users' que sea un arreglo
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users); // Accede a 'users' si es un arreglo
        } else {
          setError(
            "La respuesta de la API no contiene una lista válida de usuarios."
          );
        }
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los usuarios." + err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  if (loading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {/* Tabla con los usuarios */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Correo Electrónico</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
