export function CardModal({ card }: { card: any }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2>{card?.title}</h2>
        <p>{card?.description}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  )
}
