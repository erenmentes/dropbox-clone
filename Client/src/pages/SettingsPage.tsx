import { invoke } from "@tauri-apps/api/core";
import "../styles/Home.css";

const SettingsPage = () => {

    const handleChoose = () => {
        try {
            invoke('pick_file');
        } catch (error) {
            console.error(error);
        };
    };


    return (
        <div className="content-area">
            <nav className='navbar'>
                <h1 className='homeTitle'>Settings</h1>
            </nav>

            <main className='page-body'>
                <div className="settings-container">
                    <div className="settings-card">
                        <div className="settings-section">
                            <div className="settings-info">
                                <h3>Directory Monitoring</h3>
                                <p>
                                    Select the local folder you want the application to watch.
                                    Any changes in this folder will be synced automatically.
                                </p>
                            </div>
                            <button className="select-button" onClick={handleChoose}>
                                Choose Folder
                            </button>
                        </div>
                        <div style={{ marginTop: '20px', opacity: 0.8, fontSize: '0.8rem', textAlign: 'center' }}>
                            Current selected folder : 
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', opacity: 0.6, fontSize: '0.8rem', textAlign: 'center' }}>
                        App Version 1.0.0
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;