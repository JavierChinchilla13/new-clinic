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

  const getToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  };

  useEffect(() => {
    Axios.get("http://localhost:3000/api/v1/contacts")
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], info: value },
    }));
  };

  const handleSave = async () => {
    const token = getToken();
  
    if (!token) {
      console.error("No token found, user is not authorized");
      setError("No estás autorizado. Por favor, inicia sesión.");
      return;
    }
  
    try {
      const updates = Object.keys(formData).map((key) =>
        Axios.patch(
          `http://localhost:3000/api/v1/contacts/${formData[key].id}`,
          { info: formData[key].info },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
          nameRef="Telefono"
          handleText={handleChange}
          placeHolder="Teléfono"
        />

        <label className="block text-gray-700">Ubicación</label>
        <Input
          text={formData.Ubicacion.info}
          nameRef="Ubicacion"
          handleText={handleChange}
          placeHolder="Ubicación"
        />

        <label className="block text-gray-700">Celular</label>
        <Input
          text={formData.Celular.info}
          nameRef="Celular"
          handleText={handleChange}
          placeHolder="Celular"
        />

        <label className="block text-gray-700">Email</label>
        <Input
          text={formData.email.info}
          nameRef="email"
          handleText={handleChange}
          placeHolder="Email"
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
