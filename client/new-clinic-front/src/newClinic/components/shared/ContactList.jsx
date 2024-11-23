import React, { useState, useEffect } from "react";
import Axios from "axios";

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Información
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">
                {contact.name} {/* El nombre no se edita */}
              </td>
              <td className="border border-gray-200 px-4 py-2">
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
              <td className="border border-gray-200 px-4 py-2">
                {editingContact?._id === contact._id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingContact(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(contact)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
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
