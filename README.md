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
Then copy/paste `./dist/bookmarklet.txt` into your browsers bookmarks (or drag the link from `./dist/bookmarklet.html`).

`./dist/overrides.bundle.css` - the CSS bundle to use as "full" override. The bookmarklet fetches this file from GitHub (`main` branch), so **commit and push it after rebuilding** for changes to show up. No server is needed. Click the bookmark to apply the overrides, click again to remove them.

For local editing without pushing, run `npm run bookmarklet -- --local` and `npm run serve`, which serves the CSS at `http://localhost:8777/overrides.css`. `npm run bookmarklet -- --inline` embeds the CSS in the bookmarklet itself.