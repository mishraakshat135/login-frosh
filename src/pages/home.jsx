export default function Home() {

    const user=JSON.parse(localStorage.getItem("user"))
  return (
    <div>
      <h1>
        Home page {user.username}
      </h1>
    </div>
  );
}