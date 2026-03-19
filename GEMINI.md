This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
**IMPORTANT**: IF NOTHING IS PROVIDED, USE ALL YOUR TOOLS TO EXPLORE THE CODEBASE AND INFER ALL THE NECCESSARY DETAILS YOURSELF AND THEN ASK THE USER IF YOUR INFERENCES ARE CORRECT OR NOT. DO NOT ASSUME ANYTHING. ASK IF MORE CONTEXT OF TARGET USER OR DESIGN CHOICE IS NEEDED. IF USERS ASKS YOU TO DO IT HOW YOU LIKE IT, GET CREATIVE BUT STILL ASK FOR APPROVAL BEFORE PROCEEDING.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
MAKE SURE TO PROVIDE REASONING OF WHY THE STYLE YOU PICKED GOES WITH THE PROJECT IN HAND. IT SHOULD 100% BE JUSTIFIED.
DO NOT USE AN EXTREME JUST BEACUSE IT IS COOL OR TRENDY. THERE SHOULD ATLEAST BE 7 POINTS TO JUSTIFY THE DESIGN CHOICE.
IF YOU HAVE 7 REASONS TO JUSTIFY THE DESIGN CHOICE, THEN PROCEED. ELSE, CHOOSE ANOTHER EXTREME. (THE EXAMPLE EXTREMES MENTIONED ARE NOT FIXED. YOU ARE FREE TO GET CREATIVE OR SEARCH FOR MORE SUCH AESTHETICS ONLINE IF NEED BE.)
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

## Theming

Color choices should utilise the 60-30-10 Color Rule. It is a foundational guideline for creating balanced, visually harmonious UI designs. It divides color usage into three proportions:

60% for a primary (dominant) color, typically a neutral or base hue (like white, gray, or dark mode background) that forms the foundation of the interface. 
30% for a secondary (supporting) color, used for key UI elements like navigation bars, cards, or side panels to add contrast and structure. 
10% for an accent (highlight) color, reserved for critical interactive elements like call-to-action buttons, alerts, or key icons. This color should be vibrant and distinct to draw immediate attention.

PICK THESE COLORS CREATIVELY AND WITH PROPER REASONING AND JUSTIFICATION. ASK USER FOR CONFIRMATION ON THE COLOR PALLETE.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: GEMINI is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.