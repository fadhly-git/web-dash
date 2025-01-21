import DefaultLayout from "../components/layout/DefaultLayout";
import Card from "../components/Card/Card";
import Table from "../components/dashboard/table/table";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="container">
          <Table />

          <Card />
        </div>
      </DefaultLayout>
    </>
  );
}
