// nasa.js
const { useState, useEffect } = React;
        
        const Icons = {
            Star : '🪐',
            Navigation: '🧭',
            Info: 'ℹ️'
        };
        
        const NASASection = () => {
            const [selectedSection, setSelectedSection] = useState('apod');
            const [apodData, setApodData] = useState(null);
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState(null);
            
            // NASA API Key
            const NASA_API_KEY = 'm9K4tcMYB9ef5mxhxNEO2O6h6Rfq0sEAycQrI0jd';
            
            // NASA Astronomy Picture of the Day API
            useEffect(() => {
                const fetchAPOD = async () => {
                    if (selectedSection === 'apod') {
                        setLoading(true);
                        setError(null);
                        try {
                            const response = await fetch(
                                `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
                            );
                            const data = await response.json();
                            
                            if (data.error) {
                                setError(data.error.message || 'API-Schlüssel ungültig - Bitte registrieren Sie sich bei api.nasa.gov');
                            } else {
                                setApodData(data);
                            }
                        } catch (err) {
                            setError('Fehler beim Abrufen des Astronomie-Bildes. Bitte prüfen Sie Ihre Internetverbindung.');
                        } finally {
                            setLoading(false);
                        }
                    }
                };
                
                fetchAPOD();
            }, [selectedSection]);
            
            const sections = [
                { id: 'apod', name: 'Bild des Tages', icon: Icons.Star },
                { id: 'mission', name: 'Missionsdaten', icon: Icons.Navigation }
            ];
            
            return (
                <div>
                    <div className="lightsaber alt"></div>
                    
                    <h2>Galaktische NASA Datenbank</h2>
                    
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <p style={{ color: '#87CEFA' }}>
                            Hinweis: Für vollständige NASA-Daten benötigen Sie einen API-Schlüssel von 
                            <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" style={{ color: '#00BFFF', marginLeft: '5px' }}>
                                api.nasa.gov
                            </a>
                        </p>
                    </div>
                    
                    <div className="navigation-tabs">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setSelectedSection(section.id)}
                                className={`nav-button ${selectedSection === section.id ? 'active' : ''}`}
                            >
                                <span>{section.icon}</span> {section.name}
                            </button>
                        ))}
                    </div>
                    
                    {loading && (
                        <div className="loading">
                            <p>Lade Daten aus dem Weltraum...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="error-box">
                            <p>Fehler: {error}</p>
                        </div>
                    )}
                    
                    {/* Astronomy Picture of the Day */}
                    {selectedSection === 'apod' && apodData && !loading && (
                        <div>
                            <h3>{Icons.Star} Astronomie-Bild des Tages</h3>
                            <div>
                                {apodData.media_type === 'image' ? (
                                    <img 
                                        src={apodData.url} 
                                        alt={apodData.title}
                                        className="nasa-image"
                                    />
                                ) : (
                                    <iframe
                                        src={apodData.url}
                                        style={{width: '100%', height: '400px', borderRadius: '8px'}}
                                        title={apodData.title}
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                )}
                                <div className="output" style={{marginTop: '20px'}}>
                                    <h3>{apodData.title}</h3>
                                    <p style={{color: '#87CEFA', marginBottom: '10px'}}>{apodData.date}</p>
                                    <p style={{color: 'white', whiteSpace: 'normal'}}>{apodData.explanation}</p>
                                    {apodData.copyright && (
                                        <p style={{color: '#87CEFA', marginTop: '10px'}}>
                                            © {apodData.copyright}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Mission Data */}
                    {selectedSection === 'mission' && (
                        <div>
                            <h3>{Icons.Navigation} Historische Missionsdaten</h3>
                            <div className="mission-grid">
                                <div className="mission-card">
                                    <h3>Apollo 11</h3>
                                    <div className="mission-info">
                                        <span>Mission:</span>
                                        <span>Erste Mondlandung</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Datum:</span>
                                        <span>20. Juli 1969</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Dauer:</span>
                                        <span>8 Tage, 3 Stunden</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Crew:</span>
                                        <span>Armstrong, Aldrin, Collins</span>
                                    </div>
                                </div>
                                
                                <div className="mission-card">
                                    <h3>Voyager 1</h3>
                                    <div className="mission-info">
                                        <span>Mission:</span>
                                        <span>Interstellare Sonde</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Start:</span>
                                        <span>5. September 1977</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Entfernung:</span>
                                        <span>~22 Milliarden km</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Status:</span>
                                        <span>Im interstellaren Raum</span>
                                    </div>
                                </div>
                                
                                <div className="mission-card">
                                    <h3>Mars Perseverance</h3>
                                    <div className="mission-info">
                                        <span>Mission:</span>
                                        <span>Mars-Rover</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Landung:</span>
                                        <span>18. Februar 2021</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Status:</span>
                                        <span>Aktiv</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Entdeckungen:</span>
                                        <span>Organische Moleküle</span>
                                    </div>
                                </div>
                                
                                <div className="mission-card">
                                    <h3>James Webb Teleskop</h3>
                                    <div className="mission-info">
                                        <span>Mission:</span>
                                        <span>Weltraumteleskop</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Start:</span>
                                        <span>25. Dezember 2021</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Entfernung:</span>
                                        <span>~1.5 Millionen km (L2)</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Instrumente:</span>
                                        <span>NIRCam, MIRI, NIRSpec</span>
                                    </div>
                                </div>
                                
                                <div className="mission-card">
                                    <h3>Artemis I</h3>
                                    <div className="mission-info">
                                        <span>Mission:</span>
                                        <span>Mond-Testflug</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Start:</span>
                                        <span>16. November 2022</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Dauer:</span>
                                        <span>25.5 Tage</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Nächste:</span>
                                        <span>Artemis II (2025)</span>
                                    </div>
                                </div>
                                
                                <div className="mission-card">
                                    <h3>Hubble Teleskop</h3>
                                    <div className="mission-info">
                                        <span>Mission:</span>
                                        <span>Weltraumteleskop</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Start:</span>
                                        <span>24. April 1990</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Status:</span>
                                        <span>Aktiv seit 34 Jahren</span>
                                    </div>
                                    <div className="mission-info">
                                        <span>Beobachtungen:</span>
                                        <span>1.5+ Millionen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };
        
        // Render the app
        const root = ReactDOM.createRoot(document.getElementById('react-root'));
        root.render(<NASASection />);










