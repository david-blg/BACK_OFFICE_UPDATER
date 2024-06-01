import { useEffect } from "react";
import AppLayout from "./layouts/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import { handleUpdates } from "./updater/updater";


function App() {

    useEffect(() => {
      console.log('useEffect is called');
      const setupUpdates = async () => {
        const unlisten = await handleUpdates();
        
        // Cleanup function to unlisten to the updater events
        return () => {
          unlisten();
        };
      };
      
      setupUpdates();
  
    }, []);



  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
