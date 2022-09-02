import Facebooklogin from "../components/Facebooklogin";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>WishList</title>
      </Head>
      <div className="flex flex-col items-center justify-evenly min-h-screen bg-pink-100">
        <div className="text-center flex flex-col items-center">
          <img src="./1.svg" height={200} width={200} alt="" />
          <div className="text-3xl font-bold text-pink-600 py-4">
            Welcome to WishList
          </div>
          <div>
            Share your wishlist with your friends and close ones <br /> and
            exchange gifts.
          </div>
        </div>

        <div className="cursor-pointer border-pink-500 border-2 rounded px-3 py-2 hover:bg-pink-300 hover:border-pink-300">
          <Facebooklogin />
        </div>
      </div>
    </>
  );
}
