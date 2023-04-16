import SquidSection from "./components/SquidSection";
import InstrumentSection from "./components/InstrumentSection";

const App: React.FC = () => {
  // Functional Component
  return (
    <div className="h-screen w-screen">
      <div className="flex gap-4 justify-center p-8 border-b-2 border-white border-dashed">
        <h1 className='text-center'>SeaShark- Lab 3</h1>
        {/* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/New%20Moon%20Face.png" alt="New Moon Face" width="60" height="60" /> */}
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="flex justify-center items-center h-screen w-full  overflow-y-scroll">
          <SquidSection />
        </div>
        <div className="flex justify-center items-center h-screen w-full  overflow-y-scroll">
          <InstrumentSection />
        </div>
      </div>
    </div>
  );
};

export default App;
