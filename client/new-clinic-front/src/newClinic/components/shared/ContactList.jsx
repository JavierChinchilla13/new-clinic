import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Iconos para editar y borrar

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null); // Contacto en edición
  const [updatedInfo, setUpdatedInfo] = useState(""); // Información actualizada

  // Cargar los contactos al montar el componente
  useEffect(() => {
    Axios.get("/api/v1/contacts")
      .then((response) => {
        setContacts(response.data.Contacts);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los contactos");
        setLoading(false);
      });
  }, []);

  // Manejar la edición de un contacto
  const handleEdit = (contact) => {
    setEditingContact(contact); // Configura el contacto a editar
    setUpdatedInfo(contact.info); // Inicializa el campo con la información actual
  };

  // Guardar la información editada
  const handleSave = async () => {
    if (!updatedInfo.trim()) {
      alert("La información no puede estar vacía.");
      return;
    }

    try {
      // Construir la URL con el ID del contacto
      const url = `/api/v1/contacts/${editingContact._id}`;

      // Realizar solicitud PATCH con Axios, solo actualizando `info`
      const response = await Axios.patch(url, {
        info: updatedInfo, // Solo actualizamos el campo `info`
      });

      // Actualiza la lista localmente tras un éxito
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === editingContact._id
            ? { ...contact, info: response.data.contact.info } // Actualiza solo `info`
            : contact
        )
      );

      // Reinicia el modo edición
      setEditingContact(null);
      setUpdatedInfo("");
      alert("Contacto actualizado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el contacto. Verifica la conexión o la ruta.");
    }
  };

  // Eliminar un contacto
  const handleDelete = async (contactId) => {
    try {
      const url = `/api/v1/contacts/${contactId}`;
      await Axios.delete(url);
      
      // Actualiza la lista de contactos localmente tras la eliminación
      setContacts(contacts.filter((contact) => contact._id !== contactId));
      alert("Contacto eliminado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el contacto.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Información
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="px-4 py-4 text-sm text-gray-800">
                {contact.name} {/* El nombre no se edita */}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {editingContact?._id === contact._id ? (
                  <input
                    type="text"
                    value={updatedInfo}
                    onChange={(e) => setUpdatedInfo(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  contact.info // Solo se muestra el `info`
                )}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {editingContact?._id === contact._id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-blue-600 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setEditingContact(null)}
                      className="text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-blue-600 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
