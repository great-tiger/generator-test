'use strict';
var engine = require('ejs');
var _=require('underscore.string');
var yeoman = require('yeoman-generator');
//注意这里继承自NamedBase，也就是说我们必须提供一个名字，可以通过this.name 访问
var SectionGenerator = yeoman.generators.NamedBase.extend({
    writing: function(){
        var context = {
            content: this.name,
            id: _.classify(this.name)
        };

        var fileBase = Date.now() + "_" + _.underscored(this.name);
        var htmlFile = "app/sections/" + fileBase + ".html";
        var cssFile  = "app/css/" + fileBase + ".css";

        this.template("_section.html", htmlFile, context);
        this.template("css/_section.css", cssFile, context);
    },
    install: function(){
        var menu = this.read("_menu.html");

        var t = '<a><%= name %></a>';
        var files = this.expand("app/sections/*.html");

        for (var i = 0; i < files.length; i++) {
            var name = _.strLeftBack(_.strRight(files[i],"_"),".html");

            var context = {
                name: name,
                id:_.classify(name)
            };

            var link = engine.render(t, context);
            menu = this.append(menu, "div.menu", link);
        }

        this.write("app/menu.html", menu);
    }
});

module.exports = SectionGenerator;