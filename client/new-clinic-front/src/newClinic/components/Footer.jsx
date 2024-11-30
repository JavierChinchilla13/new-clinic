export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 flex justify-center items-center w-full">
      <p className="text-sm font-medium">
        © {currentYear} New Clínica, Todos los derechos reservados.
      </p>
    </footer>
  );
}
