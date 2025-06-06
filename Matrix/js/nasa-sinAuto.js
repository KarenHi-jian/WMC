// nasa-sinAuto.js - SIN FUNCIONES AUTOMÁTICAS
const { useState } = React;

const Icons = {
    Star : '🪐',
    Navigation: '🧭',
    Info: 'ℹ️'
};

// ✅ FUNCIÓN PRINCIPAL - SIN useEffect automático
function NASASection() {
    const [selectedSection, setSelectedSection] = useState('apod');
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // NASA API Key
    const NASA_API_KEY = 'm9K4tcMYB9ef5mxhxNEO2O6h6Rfq0sEAycQrI0jd';
    
    // ✅ FUNCIÓN PARA MANEJAR CLICS DE PESTAÑAS - Solo cambia pestaña, NO carga datos
    function handleSectionChange(sectionId) {
        return function() {
            setSelectedSection(sectionId);
            // NO cargar datos automáticamente, solo cambiar pestaña
        };
    }
    
    // ✅ FUNCIÓN MANUAL para cargar APOD - SOLO cuando el usuario hace clic
    function loadAPODData() {
        setLoading(true);
        setError(null);
        setApodData(null); // Limpiar datos anteriores
        
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.error) {
                    setError(data.error.message || 'API-Schlüssel ungültig - Bitte registrieren Sie sich bei api.nasa.gov');
                } else {
                    setApodData(data);
                }
            })
            .catch(function(err) {
                setError('Fehler beim Abrufen des Astronomie-Bildes. Bitte prüfen Sie Ihre Internetverbindung.');
            })
            .finally(function() {
                setLoading(false);
            });
    }
    
    // ✅ FUNCIÓN para limpiar datos manualmente
    function clearData() {
        setApodData(null);
        setError(null);
        setLoading(false);
    }
    
    const sections = [
        { id: 'apod', name: 'Bild des Tages', icon: Icons.Star },
        { id: 'mission', name: 'Missionsdaten', icon: Icons.Navigation }
    ];
    
    return (
        React.createElement('div', null,
            React.createElement('div', { className: 'lightsaber alt' }),
            
            React.createElement('h2', null, 'Galaktische NASA Datenbank'),
            
            React.createElement('div', { style: { textAlign: 'center', marginBottom: '20px' } },
                React.createElement('p', { style: { color: '#87CEFA' } },
                    'Hinweis: Für vollständige NASA-Daten benötigen Sie einen API-Schlüssel von ',
                    React.createElement('a', {
                        href: 'https://api.nasa.gov',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        style: { color: '#00BFFF', marginLeft: '5px' }
                    }, 'api.nasa.gov')
                )
            ),
            
            React.createElement('div', { className: 'navigation-tabs' },
                sections.map(function(section) {
                    return React.createElement('button', {
                        key: section.id,
                        onClick: handleSectionChange(section.id),
                        className: `nav-button ${selectedSection === section.id ? 'active' : ''}`
                    },
                        React.createElement('span', null, section.icon),
                        ' ',
                        section.name
                    );
                })
            ),
            
            // ✅ BOTONES MANUALES - Solo en sección APOD
            selectedSection === 'apod' && 
            React.createElement('div', { style: { textAlign: 'center', margin: '20px 0' } },
                React.createElement('button', {
                    onClick: loadAPODData,
                    className: 'button',
                    disabled: loading,
                    style: { marginRight: '10px' }
                }, 
                    loading ? 'Lädt...' : '🚀 Astronomie-Bild laden'
                ),
                React.createElement('button', {
                    onClick: clearData,
                    className: 'button',
                    disabled: loading
                }, 
                    '🗑️ Daten löschen'
                )
            ),
            
            // ✅ ESTADO DE CARGA - Solo cuando el usuario solicita datos
            loading && React.createElement('div', { className: 'loading' },
                React.createElement('p', null, 'Lade Daten aus dem Weltraum...')
            ),
            
            // ✅ ERRORES - Solo cuando hay problemas
            error && React.createElement('div', { className: 'error-box' },
                React.createElement('p', null, 'Fehler: ', error)
            ),
            
            // ✅ Astronomy Picture of the Day - Solo se muestra después de hacer clic
            selectedSection === 'apod' && apodData && !loading && 
            React.createElement('div', null,
                React.createElement('h3', null, Icons.Star, ' Astronomie-Bild des Tages'),
                React.createElement('div', null,
                    apodData.media_type === 'image' ? 
                        React.createElement('img', {
                            src: apodData.url,
                            alt: apodData.title,
                            className: 'nasa-image'
                        }) :
                        React.createElement('iframe', {
                            src: apodData.url,
                            style: { width: '100%', height: '400px', borderRadius: '8px' },
                            title: apodData.title,
                            frameBorder: '0',
                            allowFullScreen: true
                        }),
                    React.createElement('div', { className: 'output', style: { marginTop: '20px' } },
                        React.createElement('h3', null, apodData.title),
                        React.createElement('p', { 
                            style: { color: '#87CEFA', marginBottom: '10px' } 
                        }, apodData.date),
                        React.createElement('p', { 
                            style: { color: 'white', whiteSpace: 'normal' } 
                        }, apodData.explanation),
                        apodData.copyright && React.createElement('p', { 
                            style: { color: '#87CEFA', marginTop: '10px' } 
                        }, '© ', apodData.copyright)
                    )
                )
            ),
            
            // ✅ MENSAJE INICIAL para APOD - Cuando no hay datos cargados
            selectedSection === 'apod' && !apodData && !loading && !error &&
            React.createElement('div', { className: 'output', style: { textAlign: 'center', padding: '40px' } },
                React.createElement('h3', { style: { color: '#87CEFA' } }, '🌌 Bereit für Weltraum-Daten'),
                React.createElement('p', { style: { color: '#CCCCCC' } }, 
                    'Klicken Sie auf "Astronomie-Bild laden", um das heutige NASA-Bild des Tages abzurufen.'
                )
            ),
            
            // ✅ Mission Data - Datos estáticos, no requieren API
            selectedSection === 'mission' && 
            React.createElement('div', null,
                React.createElement('h3', null, Icons.Navigation, ' Historische Missionsdaten'),
                React.createElement('div', { className: 'mission-grid' },
                    // Apollo 11
                    React.createElement('div', { className: 'mission-card' },
                        React.createElement('h3', null, 'Apollo 11'),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Mission:'),
                            React.createElement('span', null, 'Erste Mondlandung')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Datum:'),
                            React.createElement('span', null, '20. Juli 1969')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Dauer:'),
                            React.createElement('span', null, '8 Tage, 3 Stunden')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Crew:'),
                            React.createElement('span', null, 'Armstrong, Aldrin, Collins')
                        )
                    ),
                    
                    // Voyager 1
                    React.createElement('div', { className: 'mission-card' },
                        React.createElement('h3', null, 'Voyager 1'),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Mission:'),
                            React.createElement('span', null, 'Interstellare Sonde')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Start:'),
                            React.createElement('span', null, '5. September 1977')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Entfernung:'),
                            React.createElement('span', null, '~22 Milliarden km')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Status:'),
                            React.createElement('span', null, 'Im interstellaren Raum')
                        )
                    ),
                    
                    // Mars Perseverance
                    React.createElement('div', { className: 'mission-card' },
                        React.createElement('h3', null, 'Mars Perseverance'),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Mission:'),
                            React.createElement('span', null, 'Mars-Rover')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Landung:'),
                            React.createElement('span', null, '18. Februar 2021')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Status:'),
                            React.createElement('span', null, 'Aktiv')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Entdeckungen:'),
                            React.createElement('span', null, 'Organische Moleküle')
                        )
                    ),
                    
                    // James Webb Teleskop
                    React.createElement('div', { className: 'mission-card' },
                        React.createElement('h3', null, 'James Webb Teleskop'),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Mission:'),
                            React.createElement('span', null, 'Weltraumteleskop')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Start:'),
                            React.createElement('span', null, '25. Dezember 2021')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Entfernung:'),
                            React.createElement('span', null, '~1.5 Millionen km (L2)')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Instrumente:'),
                            React.createElement('span', null, 'NIRCam, MIRI, NIRSpec')
                        )
                    ),
                    
                    // Artemis I
                    React.createElement('div', { className: 'mission-card' },
                        React.createElement('h3', null, 'Artemis I'),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Mission:'),
                            React.createElement('span', null, 'Mond-Testflug')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Start:'),
                            React.createElement('span', null, '16. November 2022')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Dauer:'),
                            React.createElement('span', null, '25.5 Tage')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Nächste:'),
                            React.createElement('span', null, 'Artemis II (2025)')
                        )
                    ),
                    
                    // Hubble Teleskop
                    React.createElement('div', { className: 'mission-card' },
                        React.createElement('h3', null, 'Hubble Teleskop'),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Mission:'),
                            React.createElement('span', null, 'Weltraumteleskop')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Start:'),
                            React.createElement('span', null, '24. April 1990')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Status:'),
                            React.createElement('span', null, 'Aktiv seit 34 Jahren')
                        ),
                        React.createElement('div', { className: 'mission-info' },
                            React.createElement('span', null, 'Beobachtungen:'),
                            React.createElement('span', null, '1.5+ Millionen')
                        )
                    )
                )
            )
        )
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(React.createElement(NASASection));