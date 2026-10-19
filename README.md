# Springshare-to-Rivet
A test of visually aligning Shringshare CSS to IU Rivet Design System

## Architecture
`springshare-to-rivet.md` - An attempt to map Springshare classes to Rivet   
`style-overrides` - The new CSS to use to override Springshare styles   
`required` - Existing CSS styles from Springshare (don't edit)   
`scripts` - The script that builds the bookmarklet   

## Build Test Bookmarklet
Use the bookmarklet to test rivet on different pages. To build, run:
```
npm run bookmarklet
```
Then copy/paste `./dist/bookmarklet.txt` into your browsers bookmarks
`./dist/overrides_bundle.css` - the CSS bundle to use as "full" override