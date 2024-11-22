import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import {
  HiOutlineCheck,
  HiOutlineTrash,
  HiOutlineXMark,
  HiPencilSquare,
} from "react-icons/hi2";
import { useEffect, useState } from "react";

const UserList = () => {
  const { data: users, refetch, isLoading, isError } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [updateUserData] = useUpdateUserMutation();

  const [editId, setEditId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err.data || err.message);
      }
    }
  };

  const handleEditToggle = (id, username, email) => {
    setEditId(id);
    setEditUsername(username);
    setEditEmail(email);
  };

  const updateUser = async () => {
    try {
      await updateUserData({
        id: editId,
        username: editUsername,
        email: editEmail,
      });
      toast.success("User Data updated successfully");
      setEditId(null);
    } catch (err) {
      toast.error(err?.data || err.message);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="error">Failed to get users</Message>;

  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div>
        <h2 className="font-semibold text-2xl text-center">Users List</h2>
        <table className="mx-auto max-lg:text-sm table-fixed mt-12 border border-collapse border-stone-600 rounded shadow-2xl shadow-darkLight">
          <thead>
            <tr className=" bg-darkLight">
              <th className="px-4 py-2 text-left ">Id</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
              <th className="px-4 py-2 text-left">Options</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user) => (
              <tr key={user._id} className="">
                <td className="px-4 py-2 text-left">{user._id}</td>
                <td key={user.username} className="px-4 py-2 text-left">
                  <div className="flex items-center gap-4">
                    {editId === user._id ? (
                      <>
                        {" "}
                        <input
                          type="text"
                          className="rounded  px-2 py-0.5 border bg-darkLight"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                        />
                        <button onClick={updateUser}>
                          <HiOutlineCheck className="stroke-2 icon cursor-pointer stroke-green-400 hover:opacity-60" />
                        </button>
                        <button onClick={() => setEditId(null)}>
                          <HiOutlineXMark className="stroke-2 icon cursor-pointer stroke-red-400 hover:opacity-60" />
                        </button>
                      </>
                    ) : (
                      <p>{user.username}</p>
                    )}
                  </div>
                </td>

                <>
                  <td key={user.email} className="px-4 py-2 text-left">
                    <div className="flex items-center gap-4">
                      {editId === user._id ? (
                        <>
                          {" "}
                          <input
                            type="text"
                            className="rounded  px-2 py-0.5 border bg-darkLight"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                          />
                          <button onClick={updateUser}>
                            <HiOutlineCheck className="stroke-2 icon cursor-pointer stroke-green-400 hover:opacity-60" />
                          </button>
                          <button onClick={() => setEditId(null)}>
                            <HiOutlineXMark className="stroke-2 icon cursor-pointer stroke-red-400 hover:opacity-60" />
                          </button>
                        </>
                      ) : (
                        <p>{user.email}</p>
                      )}
                    </div>
                  </td>
                </>

                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    {user.isAdmin ? (
                      <HiOutlineCheck className=" stroke-2    stroke-green-400 hover:opacity-60" />
                    ) : (
                      <HiOutlineXMark className="stroke-2   stroke-red-400 hover:opacity-60" />
                    )}
                  </div>
                </td>
                <td className="px-4 pt-2 text-left">
                  <div className="flex gap-4 items-start -mt-1">
                    <button
                      className="pb-1"
                      onClick={() =>
                        handleEditToggle(user._id, user.username, user.email)
                      }
                    >
                      <HiPencilSquare className="cursor-pointer fill-green-400" />
                    </button>
                    <button
                      disabled={isDeletingUser}
                      onClick={() => handleDelete(user._id)}
                      className="pb-1"
                    >
                      <HiOutlineTrash className="cursor-pointer stroke-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserList;
