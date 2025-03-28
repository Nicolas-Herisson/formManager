import LeftPanel from "@/components/leftPanel"
import RightPanel from "@/components/rightPanel/rightPanel"
import { useEffect, useState } from "react";
import { getForms } from "@/services/requests";

function App() {

  const [showRightPanel, setShowRightPanel] = useState(false);
  //const [forms, setForms] = useState([]);

  useEffect(() => {
      async function fetchForms() {
        const forms = await getForms();
        if ( forms)
          setShowRightPanel(true);
        else
          setShowRightPanel(false);
      }
      fetchForms();
  }, []);

  return (
    <div className="flex">
       <LeftPanel showRightPanel={showRightPanel} setShowRightPanel={setShowRightPanel} />
      {showRightPanel && <RightPanel />}
     
      {/* <Card className="dark">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card> */}
    </div>
  )
}

export default App
