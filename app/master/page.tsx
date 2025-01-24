import DefaultLayout from "@components/layout/DefaultLayout";
import Card from "@components/Card/Card";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="container">
          <Card />
        </div>
      </DefaultLayout>
    </>
  );
}
