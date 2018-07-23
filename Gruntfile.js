'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// Config for grunt-notify

		notify: {
			sass: {
				options: {
					title: 'SASS',
					message: 'Preprocessing completed'
				}
			},
			postcss: {
				options: {
					title: 'PostCSS',
					message: 'Postprocessing completed'
				}
			},
			imagemin: {
				options: {
					title: 'ImageMin',
					message: 'Images compression completed'
				}
			},
			jshint: {
				options: {
					title: 'JS Hint',
					message: 'Hinting completed'
				}
			},
			uglify: {
				options: {
					title: 'JS Uglify',
					message: 'Uglification completed'
				}
			},
			browserSync: {
				options: {
					title: 'BrowserSync',
					message: 'Process started'
				}
			},
			watch: {
				options: {
					title: 'Watch',
					message: 'Process started'
				}
			}
		},



		// Config for grunt-sass (libsass, ~4s compiling time)

		sass: {
			options: {
				sourceMap: false,
				outputStyle: 'expanded'
			},
			main: {
				files: [{
			        expand: true,
			        cwd: 'app/styles',
			        src: ['**/*.{scss,sass,css}', '!**/_*.{scss,sass,css}'],
			        dest: 'www/css',
			        filter: 'isFile',
			        ext: '.css'
			    }]
			}
		},


		// Config for grunt-postcss (multiple sass post processors, minification, autoprefixing)

		postcss: {
			options: {
				safe: true,
				map: true,
				processors: [
					require('rucksack-css')({
						fallbacks: true
					}),
					require('pixrem')(16, { // Value is the same as on _config.scss $fontSize variable multiplied by 10.
						html: true,
						replace: false,
						atrules: true,
						browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']
					}),
					require('autoprefixer')({
						browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']
					})
				]
			},
			main: {
				src: 'www/css/style.css'
			}
		},


		imagemin:{
			dynamic: {
				options: {
				    optimizationLevel: 3,
				    svgoPlugins: [{ removeViewBox: false }],
				    //use: [mozjpeg()]
				},                         
				files: [{
					expand: true,                  
					cwd: 'app/',                   
					src: ['assets/**/*.{png,jpg,gif,svg}'],  
					dest: 'www'           
					}]
				}
		},

		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			options: {
				mangle: true,
				beautify: false,
				sourceMap: true,
				sourceMapIncludeSources: true
			},
			main: {
				files: {
					'www/js/all.min.js': [
						'app/scripts/**/*.js',
						'app/scripts/*.js'
					]
				}
			}
		},


		// Config for grunt-contrib-jshint (javascript lint)

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: false,
				'-W001': true,

				// Enforcing
				notypeof: true,
				nonbsp: true,
				funcscope: true,
				unused: false,
				globals: {
					browser: true,
					devel: true,
					jQuery: true,
					console: true,
					document: true,
					module: true
				},

				// Relaxing
				asi: true,
				expr: true,
				eqnull: true,
				loopfunc: true,
				multistr: true,
				scripturl: true
			},
			files: ['app/scripts/**/*.js']
		},



		// Config for grunt-browser-sync (browser synchronisation and auto-reloader)

		browserSync: {
			options: {
				server: {
					baseDir: "www"
				},
				open: true,
				watchTask: true, // < VERY important
				reloadDelay: 100,
				reloadOnRestart: true,
				logLevel: "info"
			},
			main: {
				files: {
					src: [
						"www/**/*.html",
						"www/assets/**/*.*",
						"www/css/**/*.css",
						"www/js/**/*.js"
					]
				}
			}
		},


		// Config for grunt-contrib-watch (overseer)

		watch: {
			grunt: {
				options: { reload: true },
				files: ['Gruntfile.js']
			},
			css: {
				options: { livereload: 31337 },
				files: ['www/**/*.css']
			},
			sass: {
				options: { livereload: false },
				files: ['app/styles/**/*.{scss,sass,css}'],
				tasks: ['sass', 'notify:sass', 'postcss', 'notify:postcss']
			},
			imagemin: {
				options: { livereload: 31337 },
				files: ['app/assets/*.{png,jpg,gif,svg}'],
				tasks: ['imagemin', 'notify:imagemin']
			},
			js: {
				options: { livereload: 31337 },
				files: ['app/scripts/**/*.js'],
				tasks: ['uglify', 'notify:uglify', 'jshint', 'notify:jshint']
			},
			js: {
				options: { livereload: 31337 },
				files: ['app/scripts/**/*.js'],
				tasks: ['uglify', 'notify:uglify', 'jshint', 'notify:jshint']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	// TASKS =====================================/

	grunt.registerTask('default', [
		'sass',
		'notify:sass',
		'postcss',
		'notify:postcss',
		'imagemin',
		'notify:imagemin',
		'jshint',
		'notify:jshint',
		'uglify',
		'notify:uglify',
		'browserSync',
		'notify:browserSync',
		'watch',
		'notify:watch'
	]);
};
