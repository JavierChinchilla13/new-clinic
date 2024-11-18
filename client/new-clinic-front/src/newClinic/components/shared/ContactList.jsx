// components/ContactList.js
import React, { useState, useEffect } from "react";
import Axios from "axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <ul className="text-gray-700 list-disc ml-4 mt-4 space-y-1">
      {contacts.map((contact, index) => (
        <li key={index}>
          {contact.info}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
