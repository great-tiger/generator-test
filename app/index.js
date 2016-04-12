var _=require('underscore.string');
var engine=require('ejs');
module.exports = require('yeoman-generator').Base.extend({
    initializing: function () {
        //测试underscore
        console.log("initializing  ",_.classify("Demo Section"));
    },
    prompting : function () {
        console.log('prompting - app');
        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            this.log('appname is -->',this.appName);
            this.log('addDemoSection is -->',this.addDemoSection);
            done();
        }.bind(this));
    },
    writing: {
        'scaffoldFolders': function(){
            this.log('scaffoldFolders');
            this.mkdir("app");
            this.mkdir("app/css");
            this.mkdir("app/sections");
            this.mkdir("build");
        },
        'copyMainFiles': function(){
            this.log('copyMainFiles start');
            this.copy("_footer.html", "app/footer.html");
            this.copy("_gruntfile.js", "Gruntfile.js");
            this.copy("_package.json", "package.json");
            this.copy("css/_main.css", "app/css/main.css");

            var context = {
                site_name: this.appName
            };

            this.template("_header.html", "app/header.html", context);
            this.log('copyMainFiles end');
        },
        'generateDemoSection': function(){
            //this.log('generateDemoSection');
            //if (this.addDemoSection) {
            //    var context = {
            //        content: "Demo Section",
            //        id: _.classify("Demo Section")
            //    };
            //
            //    var fileBase = Date.now() + "_" + _.underscored("Demo Section");
            //    var htmlFile = "app/sections/" + fileBase + ".html";
            //    var cssFile  = "app/css/" + fileBase + ".css";
            //
            //    this.template("_section.html", htmlFile, context);
            //    this.template("css/_section.css", cssFile, context);
            //}

            if (this.addDemoSection) {
                var done = this.async();
                this.invoke("test:section", {args: ["Demo Section"]}, function(){
                    done();
                });
            } else {
                this.write( "app/menu.html", "");
            }
        }
    },
    install:{
        //本来是想把它写到writing中的。但是那时，创建的文件还读不到，暂时放到这里吧。这里测试了一下，这里是可以读到的。
        //当写完子generator后，为了避免代码重复。删除本部分代码。
        //generateMenu: function(){
        //    //这里涉及到的API地址 http://yeoman.io/generator/Base.html
        //    this.log('generateMenu');
        //    //read 读取文件
        //    var menu = this.read("_menu.html");
        //
        //    var t = '<a><%= name %></a>';
        //    //expand 返回复合规则的文件列表
        //    var files = this.expand("app/sections/*.html");
        //    console.log("文件个数",files.length);
        //    for (var i = 0; i < files.length; i++) {
        //        var name = _.strLeftBack(_.strRight(files[i],"_"),".html");
        //
        //        var context = {
        //            name: name,
        //            id: _.classify(name)
        //        };
        //        //engine 处理模板
        //        var link = engine.render(t, context);
        //        console.log('link',link);
        //        //append 元素
        //        menu = this.append(menu, "div.menu", link);
        //    }
        //    console.log("menu",menu);
        //    this.write("app/menu.html", menu);
        //},
        installNpm:function() {
            console.log('runNpm');
            this.spawnCommand('npm', ['install']);
        }
    }
});