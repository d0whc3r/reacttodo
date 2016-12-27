var path = require('path');
var find = require('find');
var fs = require('fs');
var os = require('os');

const TAG_START = '// scss:start';
const TAG_END = '// scss:end';

var scssfiles = path.join(__dirname, '..', 'app', path.sep);
var destfile = path.join(__dirname, '..', 'app', 'styles', 'app.scss');

var listscss = [];

find.file(/\/_[a-zA-Z1-9-]+\.scss$/, scssfiles, function (files) {
  var basepath = 'styles';
  files.forEach(function (f) {
    var file = f.replace(scssfiles, '');
    if (file.indexOf(basepath) == 0) {
      var reg = new RegExp('^' + basepath + path.sep, 'i');
      file = file.replace(reg, '');
    } else {
      file = '..' + path.sep + file;
    }
    var f = file.split(path.sep);
    var ff = f.slice(-1)[0].replace(/^_/, '').replace(/\.scss$/, '');
    var p = f.slice(0, -1).join(path.sep);
    var total = [p, ff].join(path.sep);
    listscss.push(total);
  });
  listscss.sort();
  setnewContent(listscss);
});

var addNewScss = function (list, files) {
  files.forEach(function (file) {
    var scss = '@import "' + file + '";';
    list.push(scss);
  });
  return list;
};
var removeExisting = function (c, listscss) {
  return listscss.filter(function (f) {
    if (c.indexOf(f) == -1) {
      return f;
    }
  });
};
var setnewContent = function (listscss) {
  var content = fs.readFileSync(destfile, 'utf8');
  var newcontent = [];
  var start = false;
  content.split('\n').forEach(function (c) {
    if (!start && c == TAG_START) {
      start = true;
      newcontent.push(c);
      newcontent = addNewScss(newcontent, listscss);
    } else if (start && c == TAG_END) {
      start = false;
      newcontent.push(c);
    } else if (!start) {
      listscss = removeExisting(c, listscss);
      newcontent.push(c);
    }
  });
  fs.open(destfile, 'w', function (e, id) {
    fs.write(id, newcontent.join('\n'), null, 'utf8', function () {
      fs.close(id, function () {
        console.log('[?] app.scss created');
      });
    });
  });
};
