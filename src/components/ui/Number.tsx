export default function Number({ number }: { number: number }) {
  return (
    <div className="shadow-surface text-2xl font-medium flex items-center justify-evenly rounded-full px-5 h-15 bg-surface">
      {number}
    </div>
  );
}
