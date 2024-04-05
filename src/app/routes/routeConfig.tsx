import FirstPage from "../screens/firstPage";
import Developer from "../screens/developerPage";
import Language from "../screens/languagePage";
import Learning from "../screens/learningPage";
import Login from "../screens/loginPage";

const routes = [
  { path: "/FirstPage", element: FirstPage },
  { path: "/developer", element: Developer },
  { path: "/language", element: Language },
  { path: "/learning", element: Learning },
  { path: "/", element: Login },
];

export default routes;
