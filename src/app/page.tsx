import Header from "../../components/Header"
export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <Header />
      <div className="dark:bg-black bg-amber-300">
        <main>
          <h1 className="text-white dark:text-black">Home</h1>
        </main>
      </div>
    </div>
  )
}
