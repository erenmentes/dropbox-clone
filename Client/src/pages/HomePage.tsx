import "../styles/Home.css"

const HomePage = () => {
  return (
    <>
      <nav className='navbar'>
        <h1 className='homeTitle'>Dashboard</h1>
      </nav>

      <main className='page-body' style={{ padding: '20px' }}>
        <p>total files, total shared files, account create date, devices</p>
      </main>
    </>
  )
}

export default HomePage;