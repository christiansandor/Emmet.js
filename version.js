#!/usr/bin/env node

var fs = require("fs");
var args = require("node-args");
var gulp = require("gulp");
var exec = require("child_process").exec;

var npmPackage = require("./package");
var originalVersion = "" + npmPackage.version;
var version = npmPackage.version;

var major = args.major || (args.m && args.a && args.j) || false;
var minor = args.minor || (args.m && args.i && args.n) || false;

var tasks;
var done;
var cmd;

var taskMessageLength = 0;

function getSpaces(len) {
    return Array.from(Array(len + 3)).map(function () { return " "; }).join("");
}

function fallback(err) {
    console.log("Error occured:\n");
    console.error(err.message);

    if (originalVersion === version) return console.log("Fallback not necessary as version is the same");

    console.log("\nDoing fallback...");

    npmPackage.version = originalVersion;

    fs.writeFileSync("package.json", JSON.stringify(npmPackage, null, "  ") + "\n", "utf8");
    exec("git add package.json; git commit -m 'reverting package.json to v" + originalVersion + "; git push", function (error) {
        if (error) {
            console.error("Sorry, fallback failed to do automatically\n");
            throw error;
        }

        exec("git tag -d v" + version + "; git push origin :refs/tags/v" + originalVersion, function (error) {
            if (error) {
                console.error("Sorry, fallback failed to do automatically\n");
                throw error;
            }

            console.log("Fallback done");
            throw err;
        });
    });
}

function task (msg) {
    taskMessageLength = msg.length > taskMessageLength ? msg.length : taskMessageLength;
    return function () {
        process.stdout.write(" • " + msg + getSpaces(taskMessageLength - msg.length));

        return function (err) {
            if (err) {
                console.error("failed");
                return fallback(err);
            }

            console.log("√");
        }
    };
}

require("./gulpfile");

tasks = [
    task("Building minified JS"),
    task("Writing version to package.json"),
    task("Pushing tag to git"),
    task("Publishing to npm"),
];

if (args.v || args.version) {
    version = args.v || args.version;
    if (!/^\d+\.\d+\.\d+$/.test(version)) throw Error("Wrong version number \"" + version + "\"");
} else if (args.n || args.next || args.m || args.p || args.major || args.minor || args.patch) {
    version = version.replace(/(\d+)\.(\d+)\.(\d+)/g, function (full, a, b, c) {
        if (major) {
            ++a;
            b = c = 0;
        } else if (minor) {
            ++b;
            c = 0;
        } else {
            ++c;
        }

        return a + "." + b + "." + c;
    });
}

console.log("Publishing v" + version + " over current v" + originalVersion);

if (version === originalVersion) {
    if (args.f || args.force) console.log("Forcing same version publishing");
    else return console.error("Version is the same. Use -n for next version or -f to force republishing the same.");
}

done = tasks[0]();

gulp.start("jsmin", function () {
    done();
    done = tasks[1]();

    npmPackage.version = version;
    fs.writeFile("package.json", JSON.stringify(npmPackage, null, "  ") + "\n", "utf8", function (error) {
        if (error) return done(error);

        done();
        done = tasks[2]();

        cmd = "git add .; git commit -m 'changes for v" + version + "'; git push; git tag -f v" + version + "; git push origin v" + version + "";
        exec(cmd, function (error) {
            if (error) return done(error);

            done();
            done = tasks[3]();

            cmd = "npm publish";
            exec(cmd, function (error) {
                if (error) return done(error);
                done();

                console.log("Version published successfully.")
            })
        });
    });
});