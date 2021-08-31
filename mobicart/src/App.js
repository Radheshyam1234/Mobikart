import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Myorders from "./components/Myorders";
import BuyProduct from "./components/BuyProduct";
import Mywishlist from "./components/Mywishlist";


export default function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path='/buyproduct/:name' component={BuyProduct}/>
        <Route exact path="/myorders" component={Myorders} />
        <Route exact path="/mywishlist" component={Mywishlist} />
      </Switch>
    </>
  );
}
