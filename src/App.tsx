import { AppLayout } from "./layout";
import { AppRouter } from "./routes";

function App() {
  return (
    <div className="App">
      <AppLayout>
      <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;
