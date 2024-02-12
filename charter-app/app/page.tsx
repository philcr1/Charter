export default async function Index() {
  return (
      <form action="car" method="GET">
        <div>
          <h1>Search Car Database</h1>
          <input type="text" name="carid"></input>
          <button type="submit">Search</button>
        </div>
      </form>
  );
}
