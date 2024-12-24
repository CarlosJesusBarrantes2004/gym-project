import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  MembershipsPage,
  NewMembershipPage,
  MembershipPage,
} from "../pages";

const SecondaryRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}>
        <Route
          path="matriculas"
          element={<MembershipsPage></MembershipsPage>}
        ></Route>
        <Route
          path="nueva-matricula"
          element={<NewMembershipPage></NewMembershipPage>}
        ></Route>
        <Route
          path="buscar-cliente/:dni?"
          element={<MembershipPage></MembershipPage>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default SecondaryRouter;
