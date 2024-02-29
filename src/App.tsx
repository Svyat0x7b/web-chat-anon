import ChatRoom from './components/chat-room';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src={reactLogo} alt="logo" />
                </div>
                <h1>AnonGram</h1>
                <div>TG: @tailer3301</div>
            </header>
            <main className="content">
                <ChatRoom />
            </main>
            <footer className="footer">Svyat0x7b</footer>
        </>
    );
}

export default App;
