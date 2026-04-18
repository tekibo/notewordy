export type SplashTemplate = 'gradient' | 'solid' | 'mesh' | 'dots' | 'glass';

export type SplashConfig = {
    /** App display name */
    appName: string;
    /** Short tagline beneath the app name */
    tagline?: string;
    /** Primary brand color (default: #6366f1) */
    brandColor?: string;
    /** Neutral background/text color (default: #0f172a) */
    neutralColor?: string;
    /** Template style choice */
    template?: SplashTemplate;
    /** SVG path(s) snippet OR a direct icon path (URL/File) */
    icon?: string;
}

export function buildSplashHtml(config: Partial<SplashConfig> = {}): string {
    const {
        appName = 'App',
        tagline = '',
        brandColor = '#6366f1',
        neutralColor = '#0f172a',
        template = 'gradient',
        icon = ''
    } = config;

    // Helper to determine if icon is SVG snippet or path
    const isSvgSnippet = icon.trim().startsWith('<') || icon.trim().includes(' ');
    const iconHtml = isSvgSnippet
        ? `<svg viewBox="0 0 24 24">${icon}</svg>`
        : `<img src="${icon}" alt="${appName} Icon" />`;

    // Define template CSS styles
    const stylesByTemplate: Record<SplashTemplate, string> = {
        gradient: `
            background: linear-gradient(135deg, ${neutralColor} 0%, ${brandColor} 150%);
            .splash-container::before {
                content: '';
                position: absolute;
                top: -50%; left: -50%; width: 200%; height: 200%;
                background: radial-gradient(circle at 30% 20%, ${brandColor}22 0%, transparent 50%);
                animation: shimmer 8s ease-in-out infinite;
            }
        `,
        solid: `
            background: ${neutralColor};
            border: 1px solid rgba(255,255,255,0.05);
            .splash-container::after {
                content: '';
                position: absolute;
                bottom: 0; left: 0; right: 0; height: 3px;
                background: ${brandColor};
            }
        `,
        mesh: `
            background: ${neutralColor};
            background-image: 
                radial-gradient(at 0% 0%, ${brandColor}44 0, transparent 50%), 
                radial-gradient(at 100% 0%, ${brandColor}33 0, transparent 50%), 
                radial-gradient(at 100% 100%, ${brandColor}22 0, transparent 50%), 
                radial-gradient(at 0% 100%, ${brandColor}33 0, transparent 50%);
            animation: meshMove 15s ease infinite alternate;
        `,
        dots: `
            background: ${neutralColor};
            background-image: radial-gradient(${brandColor}33 1px, transparent 1px);
            background-size: 24px 24px;
        `,
        glass: `
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        `
    };

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${appName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background: transparent;
            overflow: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; width: 100vw;
            -webkit-app-region: drag;
        }

        .splash-container {
            width: 380px;
            height: 280px;
            border-radius: 28px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 28px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            ${stylesByTemplate[template] || stylesByTemplate.gradient}
        }

        .logo-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            z-index: 2;
        }

        .icon {
            width: 64px; height: 64px;
            background: linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 100%);
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 12px 24px ${brandColor}40;
            animation: iconPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .icon svg, .icon img {
            width: 32px; height: 32px;
            object-fit: contain;
        }

        .icon svg {
            fill: none;
            stroke: white;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .app-name {
            font-size: 28px;
            font-weight: 700;
            color: white;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            animation: fadeUp 0.8s ease-out 0.2s both;
        }

        .tagline {
            font-size: 13px;
            font-weight: 400;
            color: rgba(255,255,255,0.6);
            letter-spacing: 1px;
            animation: fadeUp 0.8s ease-out 0.4s both;
        }

        .loader {
            z-index: 2;
            display: flex;
            gap: 8px;
            animation: fadeUp 0.8s ease-out 0.6s both;
        }

        .loader-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: white;
            opacity: 0.3;
        }
        .loader-dot:nth-child(1) { animation: pulse 1.5s ease-in-out infinite 0s; }
        .loader-dot:nth-child(2) { animation: pulse 1.5s ease-in-out infinite 0.2s; }
        .loader-dot:nth-child(3) { animation: pulse 1.5s ease-in-out infinite 0.4s; }

        @keyframes iconPop {
            0% { opacity: 0; transform: scale(0.5) translateY(20px) rotate(-10deg); }
            100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50%      { transform: scale(1.2); opacity: 1; background: ${brandColor}; }
        }
        @keyframes shimmer {
            0%, 100% { transform: translate(0,0); }
            50%      { transform: translate(10px, 10px); }
        }
        @keyframes meshMove {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
        }
    </style>
</head>
<body>
    <div class="splash-container">
        <div class="logo-area">
            <div class="icon">
                ${iconHtml}
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <span class="app-name">${appName}</span>
                ${tagline ? `<span class="tagline">${tagline}</span>` : ''}
            </div>
        </div>
        <div class="loader">
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
        </div>
    </div>
</body>
</html>`;
}

