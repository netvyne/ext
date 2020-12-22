<img src="https://github.com/livesports-ai/netvyne/blob/master/web/public/favicon.ico" width="64" height="64">

# Developer Instructions

## Getting Started: Getting Set Up
1. Create conda environment
2. Activate conda environment
3. Inside `api` folder, do `python -m pip install -r requirements.txt` (One-time)
4. Inside `web` folder, do `npm install` (One-time)

## Getting Started: WEB & API
1. Navigate to within the `api` folder
2. `python initialize.py` to initialize the database (and seed it)
3. Navigate to within the `web` folder
4. `npm run dev` to start webserver as well as api server

Navigate to `https://localhost:3000` in your web browser to see website

## Getting Started: EXT
1. Inside `ext` folder do `npm install` (One-time)
2. Every time you make a change, run `DEV=1 npm run build` from inside `ext` (do `npm run build` for production build using \*.netvyne.com)
3. Go to chrome > tools > extensions
4. Load unpacked extensions
5. Select build folder 'build'

On extension menu press 'refresh' button to see changes/update extension
