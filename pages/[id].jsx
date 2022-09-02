import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";
import Head from "next/head";
import SingleItem from "../components/SingleItem";
import { useRouter } from "next/router";

const WishList = () => {
  const { userName, setUserName, thisuser } = useContext(LoginContext);
  // const userName = "Rajvir Ahmed Shv";
  const [addItemModal, setAddItemModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("N/A");
  const [wish, setWish] = useState("N/A");
  const [list, setList] = useState([]);
  const [errormessage, setErrormessage] = useState("");
  const [] = useState("");

  const router = useRouter();

  useEffect(() => {
    const user = window.location.href.split("/")[3];
    if (user) {
      const getUser = async () => {
        await axios
          .get(
            `https://hellowishlist.herokuapp.com/api/user/getUserName/${user}`
          )
          .then((res) => {
            setUserName(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getUser();
      const getWishlist = async () => {
        axios
          .get(
            `https://hellowishlist.herokuapp.com/api/wishlist/getWishlist/${user}`
          )
          .then((res) => {
            setList(res.data);
          });
      };
      getWishlist();
    }
  }, [addItemModal]);

  const handleSubmit = async () => {
    if (name === "") {
      setErrormessage("Please enter a name");
      return;
    }
    if (description === "") {
      setErrormessage("Please enter a description");
      return;
    }
    await axios
      .post("https://hellowishlist.herokuapp.com/api/wishlist/postWishlist", {
        name,
        description,
        price,
        want: wish,
        userID: window.location.href.split("/")[3],
      })
      .then((res) => {
        setList(...list, res.data);
        setAddItemModal(false);
      });
  };

  return (
    <>
      <Head>
        <title>{userName}&apos;s WishList</title>
      </Head>

      {addItemModal && (
        <div className="absolute bg-blue-200 min-h-screen min-w-full">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
            <form className="bg-pink-300 px-10 py-10 w-11/12 mx-auto relative md:w-6/12">
              <div
                className="absolute right-0 mr-5 bg-white px-3 pb-1 rounded-xl text-2xl cursor-pointer"
                onClick={() => setAddItemModal(false)}
              >
                &times;
              </div>
              <div className="flex flex-col items-center justify-between">
                <img
                  src="./1.svg"
                  height={100}
                  width={100}
                  alt=""
                  className="pb-3"
                />
              </div>
              <div className="text-red-500 ">{errormessage}</div>
              <label htmlFor="title">Item Name</label>
              <input
                type="text"
                name="title"
                id=""
                className="p-2 my-2 rounded w-full outline-none"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id=""
                className="p-2 my-2 rounded w-full outline-none"
                rows="3"
                placeholder="Why do you want it?"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="price">Estimated Price</label>
              <input
                type="number"
                name="price"
                id=""
                className="p-2 my-2 rounded w-full outline-none"
                placeholder="(Optional)"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="want">How much do you want it?</label>
              <input
                type="number"
                name="want"
                id=""
                className="p-2 my-2 rounded w-full outline-none"
                min="0"
                max="5"
                placeholder="0-5"
                onChange={(e) => setWish(e.target.value)}
              />
              {/* <label htmlFor="Image">Image (Optional)</label>
              <input
                type="file"
                name="Image"
                id=""
                className="my-2 rounded w-full outline-none"
                accept="image/*"
              /> */}
              <div className="text-center">
                <div
                  className="bg-pink-500 cursor-pointer text-white px-10 py-2 rounded-lg mt-5"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {!addItemModal && (
        <div className="flex flex-col items-center min-h-screen pt-20 bg-pink-100">
          {!thisuser && (
            <div
              className="relative left-1/4 bg-pink-300 px-6 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              Login
            </div>
          )}
          <img src="./1.svg" height="100" width="100" className="pb-5" alt="" />
          {userName ? <div>{userName}&apos;s WishList</div> : ""}
          <div>
            {thisuser === userName && (
              <div
                className="text-black border-pink-500 border-2 rounded mt-4 px-3 cursor-pointer py-2 hover:bg-pink-300 hover:border-pink-300"
                onClick={() => setAddItemModal(true)}
              >
                Add an Item
              </div>
            )}
          </div>
          <div className="mt-10"></div>
          {list.length > 0 &&
            list?.map((item) => <SingleItem key={item._id} item={item} />)}
        </div>
      )}
    </>
  );
};

export default WishList;
