import FirstPage from "../screens/firstPage";
import Developer from "../screens/developerPage";
import Language from "../screens/languagePage";
import Learning from "../screens/learningPage";

const routes = [
  { path: "/", element: FirstPage },
  { path: "/developer", element: Developer },
  { path: "/language", element: Language },
  { path: "/learning", element: Learning },
];

export default routes;
