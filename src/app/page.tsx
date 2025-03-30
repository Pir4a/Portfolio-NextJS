import Header from "../../components/Header"
export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-black lg:px-[10%]">
      <Header />
      <div className="dark:bg-black bg-gray-50">
        <main>
          <h1 className="text-gray-900 dark:text-black h-screen">Home</h1>
        </main>
      </div>
    </div>
  )
}
