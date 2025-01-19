export const dynamic = "force-dynamic";

const SettingPage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return (
    <div>
      <h1>Setting</h1>
      <div>설정 페이지</div>
      <div>
        {data.map((item: { id: number; title: string }) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
};

export default SettingPage;
