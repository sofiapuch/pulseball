module.exports = function(grunt) {
	
	grunt.initConfig ({

		pkg: grunt.file.readJSON('package.json'),

		//uglify: {
		//	options: {
		//		banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		//	},
		//	build: {
		//		src: 'src/**/*.js',
		//		dest: 'build/js/<%= pkg.name %>.min.js'
		//	}
		//},

		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},

		sass: {
			dist: {
				files: {
					'build/css/main.css': 'src/css/main.scss'
				}
			}
		},

		watch: {

			hint: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			},

			css: {
				files: 'src/**/*.scss',
				tasks: ['sass']
			}
			
		}

	});

	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	//default task
	grunt.registerTask('default', ['jshint', /*'uglify',*/'sass',  'watch']);
	



};