// import { useEffect } from "react";
import AppLayout from "./layouts/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { handleUpdates } from "./updater/updater";
// import { handleUpdates } from "./updater/updater";


function App() {

  // useEffect(() => {
  //   handleUpdates();
  // }, []);

  handleUpdates();


  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
