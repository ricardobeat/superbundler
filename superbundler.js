
var rollup   = require('rollup');
var resolve  = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify   = require('rollup-plugin-uglify');

var cache;

function build (input, output) {

  rollup.rollup({
    entry: input,
    cache: cache,
    plugins: [
        resolve({
          main: true,
          // browser: true,
          extensions: ['.js', '.json'],
          // Lock the module search in this path (like a chroot). Module defined
          // outside this path will be mark has external
          // jail: '/my/jail/path', // Default: '/'
          // Any additional options that should be passed through
          // to node-resolve
          customResolveOptions: {
            moduleDirectory: '.'
          }
          // 
        }),
        // commonjs({
        //   // include: 'node_modules/**',

        //   // search for files other than .js files (must already
        //   // be transpiled by a previous plugin!)
        //   // extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

        //   // sometimes you have to leave require statements
        //   // unconverted. Pass an array containing the IDs
        //   // or a `id => boolean` function. Only use this
        //   // option if you know what you're doing!
        //   // ignore: [ 'conditional-runtime-dependency' ]
        // })
    ],
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      if
    }
  }).then(function (bundle) {
    cache = bundle;
    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
    // Alternatively, let Rollup do it for you
    // (this returns a promise). This is much
    // easier if you're generating a sourcemap
    bundle.write({
      format: 'iife',
      dest: output || 'build.js'
    });
  }).catch(err => {
    console.error(err);
  });
}

module.exports = build
