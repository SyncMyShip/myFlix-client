import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// import statement to indicate that ./index.scss needs to be bundled
import "./index.scss";


// main component 
const App = () => {
    return (
        <Provider store={store}>
            <Container>
                <MainView />
            </Container>
        </Provider>
    )
};


// finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);


// tell React to render your app in the root DOM element
root.render(<App />);