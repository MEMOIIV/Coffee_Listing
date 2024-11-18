import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [coffee, setCoffee] =  useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getApiCoffee(){
    const {data} = await axios.get("https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json")
    setTimeout(() => {
      setCoffee(data)
      setIsLoading(false)
    }, 200);
  }
  useEffect(() => {
    getApiCoffee()
  }, []);

  
  return (
    <>
    {isLoading ? 
    <>
      <div className="layerLoading d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-circle-notch fa-spin fa-4x colorIc "></i>
      </div>
    </>:
    <section>
      <div>
        <img src="../public/img/bg-cafe.jpg" className="w-100" alt="" />
      </div>

        <div className="container bg_color1 main_div py-2 rounded-4">
          <div className="m-auto title text-center  mt-5">
          <div className="layer position-relative ">
            <img src="../public/img/vector.svg" className=" position-absolute imgLayer  " alt="layer" />
          <h2 className="text_color1">Our Collection</h2>
          <p className="text_color2">
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>

          </div>

          <div className="mt-2">
          <span><button className="btn btn-secondary  me-3 p-1">All Products</button></span>
          <span><button className="btn btn-outline-secondary  p-1">Available Now</button></span>
          </div>
          
          </div>

          <div className="row pt-4">

            {coffee.map((cof , index)=>{
              return <div key={index} className="col-lg-4 col-md-6 my-4">
              <div>

                <div className="position-relative">
                  <img src={cof.image} className="w-100 rounded" alt="coffee" />
                  <div className="popular position-absolute top-0 start-0">
                    {cof.popular == true ?<button className="btn bg_btnC py-0 px-2 ms-2 mt-2">popular</button>:""}
                  </div>
                </div>

                <div className="pt-3">

                  <div className="d-flex justify-content-between">
                    <h5 className="nameCoffee">{cof.name}</h5>
                    <button className="btn bg_btnC2 py-0 px-2">{cof.price}</button>
                  </div >

                  {cof.rating != null ? (
                    <div className="d-flex justify-content-between py-2">
                    <div>
                    <i className="fa-solid fa-star color_stars"></i>
                    <span className="title_stars"> {Number(cof.rating).toFixed(1)} <span className="title_vote">({cof.votes} votes)</span></span>
                    </div>

                    <div>
                      {cof.available ? "" : <p className="Sold_out">Sold out</p>}
                    </div>

                  </div>):(
                    <>
                    <i className="fa-regular fa-star colorNo_stars"></i>
                    <span className="No_rating"> No rating </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            })}
        </div>
        </div>
      </section>}
    </>
  );
}

export default App;
