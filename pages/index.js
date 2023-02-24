import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Help</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='container'>

          <form>

            <div className='col-auto'>
              <select className='form-select' placeholder='city name' required>
                <option></option>
              </select>
            </div>

            <div className='col-auto'>
              <select className='form-select' placeholder='type of need' required>
                <option ></option>
              </select>
            </div>

            <div className='col-auto'>
              <button className='btn btn-success' type='submit'>Help Request</button>
            </div>

          </form>
        </div>
      </main>
    </>
  )
}
