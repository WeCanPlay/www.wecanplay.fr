var fs = require('fs'),
async = require('async');
var uc = require('./user_doc/config.js');
var marked = require('marked');
var hl = require("highlight.js").Highlight;

// marked.setOptions({
//   gfm: true,
//   pedantic: false,
//   // callback for code highlighter
//   highlight: function(code, lang) {
//     if (lang === 'js') {
//       return hl(code);
//     }
//     return code;
//   }
// });

// fs.readFile('user_doc/config.js', function(conf){
//     uc = JSON.parse(conf);
//console.log(uc.lang);
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
                            if (err) {
                                console.error(err);
                            } else {
                                var md = marked(o);
                                //console.log(typeof(layout));
                                var output = layout.replace('{{content}}', md);
                                output = output.replace(/{{title}}/g, p.title);
                                output = output.replace('{{menu}}', menu.join('\n'));
                                //console.log(output)

                                fs.open('public/doc/'+lang+'/'+p.file+'.html', 'w', function(err, fd){
                                    if(err) {
                                        console.error(err);
                                    } else {
                                        //console.log(output);
                                        fs.writeFile('public/doc/'+lang+'/'+p.file+'.html', output, function(err){
                                            if (err) {
                                                console.log(err);
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    });
                }
            ]);
            
        });


    });
//});



// var mdoc = require('mdoc');

// mdoc.run({

//     // === required settings === //

//     inputDir : 'doc',
//     outputDir : 'www',


//     // === basic settings === //

//     baseTitle : 'mdoc example advanced settings',
//     //indexContentPath : '../basic/index.mdown',


//     // === advanced settings === //

//     templatePath : 'template',

//     //by default it will look at an `assets_` folder inside the `templatePath`
//     assetsPath : 'custom_assets',

//     //indexContent will take precedence over `indexContentPath`
//     indexContent : '<h1>Custom Template</h1><p>Example of a custom template and advanced settings.</p>',

//     mapOutName : function(outputName) {
//         //change file output name
//         return outputName.replace('.html', '_doc.html');
//     },

//     mapTocName : function(fileName, tocObject){
//         //change the name displayed on the sidebar and on the index TOC
//         return fileName.replace('_doc.html', '');
//     },

//     // pattern that matches files that should be parsed
//     // this is the default value...
//     include : '*.mdown,*.md,*.markdown',

//     // pattern that matches files that shouldn't be parsed
//     exclude : 'array.*',

//     filterFiles : function(fileInfo) {
//         // return `false` to remove files and `true` to keep them
//         return (/math/).test(fileInfo.input);
//     },

//     // sets which heading should be treated as a section start (and is used for
//     // TOC) defaults to `2`
//     headingLevel : 2

// });