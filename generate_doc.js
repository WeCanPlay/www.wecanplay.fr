var fs = require('fs'),
path = require('path'),
async = require('async'),
marked = require('marked');

var uc = require('./user_doc/config.js');

function mkdirs(path, callback){
    var path = path.indexOf('\\') >= 0 ? path.replace(/\\/g, '/') : path;//change windows slashes to unix
    if (path.substr(path.length - 1) == '/') { //remove trailing slash
        path = path.substr(0, path.length - 1);
    }

    function tryDirectory(dir, cb){
        //console.log('path is:' + dir );
        var stat ;
        try {
            stat = fs.statSync(dir) ;

            // the file exist
            if (stat.isDirectory()) { //directory exists, no need to check previous directories
                cb();
            }
            else { //file exists at location, cannot make folder
                return cb(new Error('exists'));
            }

        }
        catch(err)
        {
            if (err) { //the file doesn't exist, try one stage earlier then create
                //console.log('failed to get stat of ' + dir + ', errno is :' + err.errno);
                if (err.errno == 2 || err.errno == 32 || err.errno == 34 ) {

                    //if (dir.lastIndexOf('/') == dir.indexOf('/')) {//only slash remaining is initial slash
                        //should only be triggered when path is '/' in Unix, or 'C:/' in Windows
                        //cb(new Error('notfound'));
                    //}
                    if (dir.length < 2) {
                        cb(new Error('invalid_path'));
                    }
                    else {
                        // try one stage earlier then create
                        tryDirectory(dir.substr(0, dir.lastIndexOf('/')), function(err){
                            if (err) { //error, return
                                cb(err);
                            }
                            else { //make this directory
                                try {
                                    fs.mkdirSync(dir, 0777);

                                    console.log('make dir ok, dir:' + dir);
                                    cb();
                                }
                                catch (error) {
                                    if (error && error.errno != 17 ) {
                                        console.log("Failed to make " + dir);
                                        return cb(new Error('failed'));
                                    }
                                }
                            }
                        });
                    }
                }
                else { //unkown error
                    console.log(util.inspect(err, true));
                    cb(err);
                }
            }

        }

    }
    tryDirectory(path, callback);
}


async.forEach(uc.lang, function(k){
    var lang = k.lang;
    var title = k.title;
    var pages = k.pages;
    var menu = [];

    fs.readFile('user_doc/layout.html', 'ascii', function(err, layout){
        async.waterfall([
            /* Create menu */
            function(next) {
                pages.forEach(function(p){
                    menu.push('<li><a href="'+'/doc/'+lang+'/'+p.file+'.html'+'">'+p.title+'</a></li>');
                });
                next(null);
            },
            function(next) {
                pages.forEach(function(p){
                    //console.log('page:',p)
                    fs.readFile('user_doc/'+lang+'/'+p.file+'.md', 'ascii', function(err, o){
                        next(err, o, p);
                    });
                });
            },
            function(o, p, next) {
                var md = marked(o);

                var output = layout.replace('{{content}}', md);
                output = output.replace(/{{title}}/g, p.title);
                output = output.replace('{{menu}}', menu.join('\n'));

                var path = 'public/doc/'+lang+'/'+p.file+'.html';
                mkdirs('public/doc/'+lang+'/', function(){
                    fs.open(path, 'w', function(err, fd){
                        next(err, path, output);
                    });
                });
            },
            function(path, output, next) {
                //console.log(output);
                fs.writeFile(path, output, function(err){
                    if (err) {
                        console.log(err);
                    }
                });
            }
        ], function(err){
            console.error(err);
        });
        
    });
});
