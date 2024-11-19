import React, { useEffect, useState } from "react";
import Axios from "axios";
import Input from "./shared/Input";

const EditContactInfoModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    Telefono: { id: "", info: "" },
    Ubicacion: { id: "", info: "" },
    Celular: { id: "", info: "" },
    email: { id: "", info: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get("api/v1/contacts")
      .then((response) => {
        const contacts = response.data.Contacts;
        setFormData({
          Telefono: {
            id: contacts.find((c) => c.name === "Telefono")?._id || "",
            info: contacts.find((c) => c.name === "Telefono")?.info || "",
          },
          Ubicacion: {
            id: contacts.find((c) => c.name === "Ubicacion")?._id || "",
            info: contacts.find((c) => c.name === "Ubicacion")?.info || "",
          },
          Celular: {
            id: contacts.find((c) => c.name === "Celular")?._id || "",
            info: contacts.find((c) => c.name === "Celular")?.info || "",
          },
          email: {
            id: contacts.find((c) => c.name === "email")?._id || "",
            info: contacts.find((c) => c.name === "email")?.info || "",
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar los datos:", err);
        setError("Error al cargar los datos.");
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], info: value },
    }));
  };

  const handleSave = async () => {
    try {
      const updates = Object.keys(formData).map((key) =>
        Axios.patch(
          `api/v1/contacts/${formData[key].id}`,
          { info: formData[key].info }
        )
      );

      await Promise.all(updates);
      alert("Datos actualizados correctamente.");
      closeModal();
    } catch (error) {
      console.error("Error al hacer la solicitud:", error.response || error);
      setError("Error al actualizar los datos.");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-red-500">{error}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={closeModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md grid">
        <h2 className="text-xl font-semibold mb-4">Editar Información de Contacto</h2>

        <label className="block text-gray-700">Teléfono</label>
        <Input
          text={formData.Telefono.info}
          handleText={handleChange}
          placeHolder="Teléfono"
          nameRef="Telefono"
        />

        <label className="block text-gray-700">Ubicación</label>
        <Input
          text={formData.Ubicacion.info}
          handleText={handleChange}
          placeHolder="Ubicación"
          nameRef="Ubicacion"
        />

        <label className="block text-gray-700">Celular</label>
        <Input
          text={formData.Celular.info}
          handleText={handleChange}
          placeHolder="Celular"
          nameRef="Celular"
        />

        <label className="block text-gray-700">Email</label>
        <Input
          text={formData.email.info}
          handleText={handleChange}
          placeHolder="Email"
          nameRef="email"
        />

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactInfoModal;
