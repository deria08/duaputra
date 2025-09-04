<button
  onClick={() => {
    localStorage.removeItem("isAdmin");
    router.push("/");
  }}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Logout
</button>
