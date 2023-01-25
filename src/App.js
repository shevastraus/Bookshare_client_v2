import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import Bookshelf from "./pages/Bookshelf/Bookshelf";
import Map from "./pages/Map/Map";
import Add from "./pages/Add/Add";
import Remote from "./pages/Remote/Remote";
import Borrow from "./pages/Borrow/Borrow";
import Support from "./pages/Support/Support";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LogIn} />

          <Route path="/signup" component={SignUp} />

          <Route>
            <Header />

            <Switch>
              <Route path="/map" exact component={Map} />

              <Route path="/mybookshelf/add" component={Add} />

              <Route path="/mybookshelf" exact component={Bookshelf} />

              <Route path="/" exact component={HomePage} />

              <Route
                path="/map/borrow/:title/:bookshelf_id"
                component={Borrow}
              />

              <Route path="/map/:bookshelf_id" component={Remote} />

              <Route path="/support" exact component={Support} />
            </Switch>

            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
