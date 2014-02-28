Npm.depends({
    'twit': '1.1.12' // Where x.x.x is the version, e.g. 0.3.2
});

Package.on_use(function (api) {
    api.add_files('twit.js', 'server'); // Or 'client', or ['server', 'client']
});