import React, { useEffect } from 'react';

export const CursorTrail: React.FC = () => {
    useEffect(() => {
        const sparks: HTMLElement[] = [];
        let lastSparkTime = 0;

        const createSpark = (x: number, y: number) => {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.pointerEvents = 'none';
            spark.style.width = '10px';
            spark.style.height = '10px';
            spark.style.borderRadius = '50%';
            spark.style.backgroundColor = '#A3E635';
            spark.style.boxShadow = '0 0 10px #A3E635, 0 0 15px #A3E635';
            spark.style.zIndex = '9999';
            spark.style.animation = 'sparkle 0.5s ease-out forwards';
            spark.style.transformOrigin = 'center';
            document.body.appendChild(spark);
            sparks.push(spark);

            setTimeout(() => {
                spark.remove();
                sparks.shift();
            }, 500);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastSparkTime > 30) { // Throttle spark creation
                createSpark(e.clientX, e.clientY);
                lastSparkTime = now;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            sparks.forEach(spark => spark.remove());
        };
    }, []);

    return null; // This component doesn't render anything itself
};
