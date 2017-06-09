Basic Gulp project set up.

To start the project run npm-install and run gulp in the command line

The TODO list:
1. Install Gulp, npm, node.
2. Start a basic set up with "npm init"
3. Add Dummy structure (Some sass and js files under 'src' and 'dist' folders )
4. Publish to Github
5. Add some additional task later

The gulp tasks:
1. Concatenate the scripts into one file called app.js (concatenation package -gulp-concat)
2. Minify and rename app.js to app.min.js (the uglify package - gulp-uglify)
3. Compile the Sass to a style.css CSS file (the Sass compiler plugin -gulp-sass)
4. Minify and rename style.css to style.min.css (the CSS minifier package, and the renaming package -gulp-minify-css and gulp-rename)

You can install all packages at once like:
'npm install --save-dev gulp-concat gulp-uglify gulp-sass gulp-minify-css gulp-rename'

created scripts, styles and watch task in gulpfile.js. 


