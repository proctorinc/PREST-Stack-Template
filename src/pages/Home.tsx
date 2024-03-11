import useAuth from "@/features/auth/hooks/useAuth";
import useUser from "@/features/user/hooks/useUser";

function Home() {
  const { logout } = useAuth();
  const currentUser = useUser();

  return (
    <div>
      <h1>You are logged in</h1>
      <p>Name: {currentUser.name}</p>
      <p>Role: {currentUser.role}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Home;
