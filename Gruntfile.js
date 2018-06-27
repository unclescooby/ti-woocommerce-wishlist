module.exports = function (grunt) {

	// require it at the top and pass in the grunt instance
	require('time-grunt')(grunt);

	// Load all Grunt tasks
	require('jit-grunt')(grunt, {
		makepot: 'grunt-wp-i18n'
	});

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),


		// Concat and Minify our js.
		uglify: {
			dist: {
				files: {
					'assets/js/public.min.js': 'assets/js/public.js',
					'assets/js/admin.min.js': 'assets/js/admin.js'
				}
			}
		},

		// Minify CSS
		cssmin: {
			dist: {
				options: {
					shorthandCompacting: false,
					roundingPrecision: -1,
					keepSpecialComments: 0
				},

				files: {
					'assets/css/admin.min.css': 'assets/css/admin.css',
					'assets/css/admin-form.min.css': 'assets/css/admin-form.css',
					'assets/css/admin-setup.min.css': 'assets/css/admin-setup.css',
					'assets/css/bootstrap.min.css': 'assets/css/bootstrap.css',
					'assets/css/public.min.css': 'assets/css/public.css',
					'assets/css/theme.min.css': 'assets/css/theme.css'
				}
			}
		},


		// Autoprefixer.
		autoprefixer: {
			dist: {
				options: {
					browsers: [
						'last 8 versions', 'ie 8', 'ie 9'
					]
				},

				files: {
					'assets/css/public.css': 'assets/css/public.css',
					'assets/css/theme.css': 'assets/css/theme.css',
					'assets/css/admin.css': 'assets/css/admin.css',
					'assets/css/admin-form.css': 'assets/css/admin-form.css',
					'assets/css/admin-setup.css': 'assets/css/admin-setup.css'
				}
			}
		},


		// Compile our sass.
		sass: {
			dist: {
				options: {
					outputStyle: 'expanded',
					sourceMap: false,
				},
				files: {
					'assets/css/admin.css': 'sass/admin.scss',
					'assets/css/theme.css': 'sass/theme.scss',
					'assets/css/public.css': 'sass/public.scss',

				}
			},
		},


		makepot: {
			target: {
				options: {
					domainPath: '/languages/', // Where to save the POT file.
					exclude: [ // Exlude folder.
						'.idea/.*',
						'assets/.*',
						'node_modules/.*'
					],
					potFilename: '<%= pkg.name %>.pot', // Name of the POT file.
					type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
					updateTimestamp: true, // Whether the POT-Creation-Date should be updated without other changes.
					processPot: function (pot, options) {
						pot.headers['plural-forms'] = 'nplurals=2; plural=n != 1;';
						pot.headers['last-translator'] = 'TemplateInvaders\n';
						pot.headers['language-team'] = 'TemplateInvaders\n';
						pot.headers['x-poedit-basepath'] = '..\n';
						pot.headers['x-poedit-language'] = 'English\n';
						pot.headers['x-poedit-country'] = 'UNITED STATES\n';
						pot.headers['x-poedit-sourcecharset'] = 'utf-8\n';
						pot.headers['x-poedit-searchpath-0'] = '.\n';
						pot.headers['x-poedit-keywordslist'] = '_esc_attr__;esc_attr_x;esc_attr_e;esc_html__;esc_html_e;esc_html_x;__;_e;__ngettext:1,2;_n:1,2;__ngettext_noop:1,2;_n_noop:1,2;_c;_nc:4c,1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;_nx_noop:4c,1,2;\n';
						pot.headers['x-textdomain-support'] = 'yes\n';
						return pot;
					}
				}
			}
		},

		header: {
			dist: {
				options: {
					text: '/*! <%= pkg.title %> - version <%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;\n' +
						' * Licensed GPLv2+' +
						' */\n'
				},
				files:
					{
						'assets/css/admin.min.css': 'assets/css/admin.min.css',
						'assets/css/admin-form.min.css': 'assets/css/admin-form.min.css',
						'assets/css/admin-setup.min.css': 'assets/css/admin-setup.min.css',
						'assets/css/public.min.css': 'assets/css/public.min.css',
						'assets/css/theme.min.css': 'assets/css/theme.min.css',
						'assets/js/public.min.js': 'assets/js/public.min.js',
						'assets/js/admin.min.js': 'assets/js/admin.min.js'
					}

			}
		}

	});


	grunt.registerTask('default', [
		'uglify',
		'sass',
		'autoprefixer',
		'cssmin',
		'header',
		// 'makepot',
	]);


};
