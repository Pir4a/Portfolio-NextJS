import Header from "../../components/Header"
export default function Home() {
  return (
    <div className="bg-white dark:bg-black lg:px-[10%]">
      <Header />
      <div className="dark:bg-black bg-white">
        <main>
          <h1 className="text-white dark:text-black h-screen">Home</h1>
        </main>
      </div>
    </div>
  )
}
