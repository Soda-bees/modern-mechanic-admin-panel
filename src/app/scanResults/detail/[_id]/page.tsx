interface Props {
  params: {
    _id: string; // ✅ use _id here to match the folder
  };
}

export default function ScanResultDetail({ params }: Props) {
  const { _id } = params;
  console.log("params", params);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan Result Detail</h1>
      <p className="text-gray-700">
        Showing details for ID: <strong>{_id}</strong>
      </p>
    </div>
  );
}
