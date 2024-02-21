const NavBar = () => {
  return (
    <div className="container">
      <ul className="mt-3 mr-8 flex flex-row justify-center space-x-4 mb-4">
        <li>
          <a
            href="allnotes"
            className="no-underline text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-full border-2 border-slate-300"
          >
            All Notes
          </a>
        </li>

        <li>
          <a
            href="newnotes"
            className="no-underline text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-full border-2 border-slate-300"
          >
            New Note
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
