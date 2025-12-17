# Image Requirements for Profile Picture Hover Effects

## Required Images

Please add the following 3 images to `/client/public/images/` directory:

### 1. `me formal hover.png`

- **Purpose**: Light mode hover state
- **Description**: Lighter/brighter version of the profile picture (possibly with glasses)
- **Shown when**: User hovers over profile picture in light mode

### 2. `me formal black.png`

- **Purpose**: Dark mode default state
- **Description**: Profile picture optimized for dark backgrounds (darker/black background version)
- **Shown when**: Page is in dark mode (default, no hover)

### 3. `me formal black hover.png`

- **Purpose**: Dark mode hover state
- **Description**: Dark mode version with hover effect (possibly with glasses on dark background)
- **Shown when**: User hovers over profile picture in dark mode

## Image States Logic

| Mode  | State   | Image File                          |
| ----- | ------- | ----------------------------------- |
| Light | Default | `/images/profile.jpg` (existing)    |
| Light | Hover   | `/images/me formal hover.png`       |
| Dark  | Default | `/images/me formal black.png`       |
| Dark  | Hover   | `/images/me formal black hover.png` |

## Implementation Complete

The hover effect logic has been implemented in `Hero.jsx` using absolute positioning and opacity transitions.
Once you add these 3 images, the hover effects will work automatically.
