import React from 'react';
import './footer.css';

export default () => {
    return (
        <div className="footer">
            Apenas Demonstração<br />
            Criado por <a href="https://thallesmaia.com/"
                          target="_blank"
                          rel="noopener noreferrer">
                            Thalles Maia
            </a><br />
            Este projeto é <a href="https://github.com/tmaiadev/pwa-store"
                target="_blank"
                rel="noopener noreferrer">
                Open Source
            </a> ❤️
        </div>
    )
}