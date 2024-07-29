import { createRoot } from 'react-dom/client';

// import statement to indicate that ./index.scss needs to be bundled
import "./index.scss";


// main component 
const MyFlixApplication = () => {
    return (
        <div className='my-flix'>
            <div>Good morning</div>
        </div>
    );
};


// finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);


// tell React to render your app in the root DOM element
root.render(<MyFlixApplication />);