import Nav from './components/Nav'
import Jumbotron from './components/Jumbotron';
import SoundSection from './components/SoundSection';
import DisplaySection from './components/DisplaySection';
import WebgiViewer from './components/WebgiViewer';
import Loader from './components/Loader'
import { useRef } from 'react';

function App() {
  const webgiViewerRef = useRef(null)
  const contentRef = useRef(null)
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview() // 调用子组件的方法
  }

  return (
    <div className="App">
      <Loader />
      <div ref={contentRef} className='content'>
        <Nav />
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>
      <WebgiViewer contentRef={contentRef} ref={webgiViewerRef} />
    </div>
  );
}

export default App;
