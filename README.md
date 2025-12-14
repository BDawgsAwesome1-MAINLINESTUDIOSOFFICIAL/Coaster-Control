# Coaster Control - 3D Roller Coaster Tycoon Game

A modern 3D roller coaster tycoon game built with React, Three.js, and React Three Fiber.

## Features

- 🎢 **3D Track Building**: Build custom roller coaster tracks by placing points in 3D space
- 🎮 **Interactive Controls**: Intuitive camera controls and track placement system
- 🚂 **Coaster Simulation**: Watch your coaster ride along the tracks you build
- 💰 **Park Management**: Manage money, visitors, park rating, and happiness
- 🎨 **Beautiful 3D Graphics**: Modern rendering with shadows, lighting, and materials

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BDawgsAwesome1-MAINLINESTUDIOSOFFICIAL/Coaster-Control.git
cd Coaster-Control
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:3000`

## How to Play

### Building Tracks

1. Click "Start Building Track" in the build panel
2. Click on the ground to place track points (minimum 4 points required)
3. A preview of your track will be shown in real-time
4. Click "Finish Track" to complete and pay for the track
5. The track will be added to your park

### Running the Coaster

1. Build at least one track
2. Click "Start Ride" to watch the coaster travel along the first track
3. Click "Stop Ride" to stop the simulation

### Camera Controls

- **Left Click + Drag**: Rotate camera around the scene
- **Right Click + Drag**: Pan camera
- **Scroll Wheel**: Zoom in/out

## Game Mechanics

- **Money**: Start with $50,000. Each track point costs $100
- **Park Rating**: Increases as you build more tracks
- **Visitors**: Attracted based on your park rating
- **Happiness**: Improves with more attractions

## Tech Stack

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Zustand** - State management
- **Vite** - Build tool and dev server

## Project Structure

```
Coaster-Control/
├── src/
│   ├── components/
│   │   ├── Scene.jsx       # Main 3D scene setup
│   │   ├── TrackBuilder.jsx # Track building logic
│   │   ├── Coaster.jsx     # Coaster simulation
│   │   ├── Ground.jsx      # Ground plane
│   │   ├── Lighting.jsx    # Scene lighting
│   │   ├── UI.jsx          # Game UI
│   │   └── UI.css          # UI styles
│   ├── store/
│   │   └── gameStore.js    # Game state management
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── package.json
└── vite.config.js
```

## Future Enhancements

- Multiple coaster types
- Station building
- Scenery and decorations
- Advanced physics simulation
- Save/load park functionality
- Multiplayer support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


