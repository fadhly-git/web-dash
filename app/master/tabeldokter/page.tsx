import DefaultLayout from "@components/layout/DefaultLayout";
import Table from "@components/dashboard/table/tableDokter";

export default function TabelDokter() {
  return (
    <>
      <DefaultLayout>
        <div className="w-full">
          <Table />
        </div>
      </DefaultLayout>
    </>
  );
}
